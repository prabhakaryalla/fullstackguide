# IAM: An Explicit Deny Always Wins

IAM policy evaluation isn't "most specific policy wins" or "last policy evaluated wins" — a single explicit `Deny`, anywhere across every applicable policy, always overrides every `Allow`, no matter how many other policies grant the permission or how narrowly scoped they are.

## The Trap

```json
// Policy A, attached directly to the user - broad access
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}

// Policy B, attached to a Group the user belongs to - a narrow, seemingly unrelated restriction
{
  "Effect": "Deny",
  "Action": "s3:DeleteObject",
  "Resource": "arn:aws:s3:::critical-backups/*"
}
```

**Question:** Can this user delete an object in the `critical-backups` bucket?

**Answer:** No — even though Policy A explicitly grants `s3:*` (which includes `DeleteObject`) on every resource, Policy B's narrow `Deny` on that one specific bucket still wins. The user can freely `s3:DeleteObject` on any *other* bucket, but never on `critical-backups`.

## Why This Happens

- AWS evaluates **every** IAM policy that applies to a request — identity-based policies (attached to the user, group, or role), resource-based policies (like an S3 bucket policy), permission boundaries, and Service Control Policies (SCPs) if the account is inside an AWS Organization — all at once, not in any particular priority order based on where they're attached.
- The evaluation logic is: if **any** applicable statement is an explicit `Deny`, the request is denied, full stop — regardless of how many `Allow` statements also apply, and regardless of which policy (broad or narrow, old or new) granted them.
- If there's no explicit `Deny` anywhere, but also no explicit `Allow` anywhere, the request is denied by the **implicit deny** default — IAM is deny-by-default unless something explicitly allows the action.
- Only when there's at least one explicit `Allow` **and** zero explicit `Deny`s across every applicable policy does the request actually succeed.

## The Precedence, Visually

```
1. Explicit Deny anywhere?          → DENIED (this always wins, no matter what else allows it)
2. No explicit Deny, but no
   explicit Allow anywhere either?  → DENIED (implicit deny-by-default)
3. No explicit Deny, and at least
   one explicit Allow?              → ALLOWED
```

## Where This Bites People in Practice

```
A developer troubleshooting "why can't this user do X" checks the user's own
attached policy, sees a clear Allow, and is confused when the action still fails.

The actual Deny is often somewhere they didn't think to check:
  - a Group the user belongs to
  - a Permission Boundary set on the user/role
  - a Service Control Policy (SCP) at the AWS Organizations level
  - the target resource's own resource-based policy (e.g. an S3 bucket policy)
```

A very common real debugging trap: someone grants broad access directly on a user, confirms the policy looks correct, and still can't explain an `AccessDenied` error — because the actual blocking `Deny` lives in a completely different policy attached somewhere else entirely (most commonly an SCP at the Organization level, which applies org-wide and is easy to forget about when debugging a single account).

## Common Mistake

Assuming a more "specific" or more "recently attached" policy takes precedence over a broader, older one — IAM has no such concept. There's no ranking or ordering between policies at all; the only rule that matters is "does any applicable statement, anywhere, explicitly Deny this" — and if so, nothing else changes the outcome.

## Summary

IAM authorization is deny-by-default, and a single explicit `Deny` in any applicable policy — identity-based, resource-based, a permission boundary, or an SCP — always overrides every `Allow`, regardless of how broad, narrow, old, or newly attached that Allow is. When troubleshooting an unexpected `AccessDenied`, the fix is checking every layer that could contain a Deny, not just the most obvious policy attached directly to the user.
