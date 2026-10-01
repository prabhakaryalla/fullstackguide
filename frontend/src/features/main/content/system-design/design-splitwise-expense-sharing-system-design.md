# Design Splitwise (Expense Sharing)

Splitwise lets groups of people share expenses (rent, trips, dinners) and tracks who owes whom, simplifying a tangled web of debts down to the minimum number of settling payments.

In system design interviews, this question tests your data modeling for shared ledgers and, most distinctively, the **debt simplification algorithm** — a graph problem hiding inside a product feature.

## 1. Problem Statement

Design a system like Splitwise that supports:

- creating groups and adding expenses split among members (equally, by exact amount, or by percentage)
- tracking each member's running balance with every other member
- simplifying debts so people settle up with the fewest transactions
- recording settlement payments

## 2. Requirements

### Functional

- Create groups and add members.
- Add an expense and split it among selected members (equal/exact/percentage split).
- View "who owes whom" per group and overall, per user.
- Simplify debts into minimal settling transactions.
- Record a settlement ("Alice paid Bob $20") to close out balances.

### Non-Functional

- Balances must always be correct and consistent — this is financial data, even if small-scale.
- Reads (checking balances) far outnumber writes (adding expenses).
- Should scale to large groups (e.g., extended trips, roommates over years) without balance computation becoming slow.

## 3. Scale (Rough Estimate)

Assume:

- 20M users, average 5 groups per user, average group size 6.
- 10M new expenses/day (~115 writes/sec average).
- Balance reads happen far more often than writes (users check "who owes me" frequently) — maybe 20:1 read:write.

Implications:

- Per-group balances are naturally small (a handful to dozens of members), so debt simplification runs on a tiny graph per group — no need for distributed graph processing.
- The write path (adding an expense) must atomically update all affected pairwise balances — a good fit for a single transactional database write per expense.
- Precompute/cache the "simplified" view since it's read far more than expenses are added.

## 4. API Design

### Create Group

- `POST /api/v1/groups` — Body: `name`, `memberIds`

### Add Expense

- `POST /api/v1/groups/{id}/expenses`
- Body: `paidBy`, `amount`, `splitType` (equal/exact/percentage), `splits` (per-member share)

### Get Balances

- `GET /api/v1/groups/{id}/balances` — pairwise balances within the group
- `GET /api/v1/users/{id}/balances` — a user's net balance across all groups

### Simplify Debts

- `GET /api/v1/groups/{id}/simplified-debts` — minimal set of settling transactions

### Settle Up

- `POST /api/v1/groups/{id}/settlements` — Body: `fromUser`, `toUser`, `amount`

## 5. High-Level Architecture

```archify
diagrams/sd-splitwise-architecture.html
```

## 6. Database Schema

**groups**

- `group_id` (PK), `name`, `created_at`

**group_members**

- `group_id`, `user_id` (composite PK)

**expenses**

- `expense_id` (PK), `group_id`, `paid_by_user_id`, `amount`, `description`, `created_at`

**expense_splits**

- `expense_id`, `user_id` (composite PK), `share_amount` — how much of the expense this member owes.

**balances** (precomputed pairwise ledger, updated transactionally with each expense/settlement)

- `group_id`, `user_a_id`, `user_b_id`, `amount` (positive = `user_b` owes `user_a`, by convention)

**settlements**

- `settlement_id` (PK), `group_id`, `from_user_id`, `to_user_id`, `amount`, `created_at`

## 7. Balance Update on New Expense (Code)

When an expense is added, update the pairwise `balances` row between the payer and every other participant in the same transaction that inserts the expense — keeping reads (`GET /balances`) O(1) instead of recomputing from the full expense history every time.

```python
def add_expense(group_id, paid_by, amount, splits):
    # splits: list of (user_id, share_amount), share_amount sums to `amount`
    with db.transaction():
        expense_id = db.insert_expense(group_id, paid_by, amount)
        for user_id, share in splits:
            db.insert_expense_split(expense_id, user_id, share)
            if user_id != paid_by:
                # user_id owes paid_by their share
                update_pairwise_balance(group_id, ower=user_id, owed_to=paid_by, delta=share)

def update_pairwise_balance(group_id, ower, owed_to, delta):
    # Store balances with a canonical ordering (smaller_id, larger_id) to avoid duplicate/conflicting rows
    a, b = sorted([ower, owed_to])
    sign = 1 if owed_to == a else -1
    db.upsert_balance(group_id, a, b, delta=sign * delta)
```

## 8. Debt Simplification Algorithm

Naive per-expense tracking can leave many small pairwise debts (A owes B, B owes C, C owes A) that all net out but still require multiple payments. Debt simplification finds the **minimum number of transactions** to settle everyone up.

```archify
diagrams/sd-splitwise-debt-simplification.html
```

```python
def simplify_debts(net_balances: dict[str, float]) -> list[tuple[str, str, float]]:
    # net_balances: user_id -> net amount (positive = should receive money, negative = owes money)
    creditors = [(uid, amt) for uid, amt in net_balances.items() if amt > 0]
    debtors = [(uid, -amt) for uid, amt in net_balances.items() if amt < 0]
    creditors.sort(key=lambda x: -x[1])
    debtors.sort(key=lambda x: -x[1])

    transactions = []
    i = j = 0
    while i < len(debtors) and j < len(creditors):
        debtor_id, debt_amt = debtors[i]
        creditor_id, credit_amt = creditors[j]
        settle_amt = min(debt_amt, credit_amt)
        transactions.append((debtor_id, creditor_id, settle_amt))

        debtors[i] = (debtor_id, debt_amt - settle_amt)
        creditors[j] = (creditor_id, credit_amt - settle_amt)
        if debtors[i][1] == 0:
            i += 1
        if creditors[j][1] == 0:
            j += 1
    return transactions
```

This greedy approach only computes the **minimum count** of transactions (a well-known simplification), not necessarily preserving "who originally owed whom" — which matches how Splitwise's real "simplify debts" feature behaves.

## 9. Flow: Adding an Expense and Viewing Balances

```archify
diagrams/sd-splitwise-expense-sequence.html
```

## 10. Simplification Pipeline (On-Demand vs. Precomputed)

```archify
diagrams/sd-splitwise-simplification-pipeline.html
```

Since each group's balance graph is small, simplification can be recomputed synchronously on every write and cached — there's no need for an expensive background batch job here, unlike larger-scale pipelines (e.g., recommendations).

## 11. Key Components

- **Expense service** — validates splits sum correctly and writes the expense atomically with its per-member shares.
- **Balance service** — maintains the precomputed pairwise balance table so reads never need to replay the full expense history.
- **Debt simplification service** — runs the greedy creditor/debtor matching algorithm per group, small enough to compute on demand.
- **Settlement recording** — treats a settlement exactly like a negative expense between two users, updating the same balance table.

## 12. Key Challenges

- **Floating-point precision** — money must be stored as integer cents (or a fixed-point decimal type), never raw floats, to avoid rounding drift across many small splits.
- **Split rounding** — splitting $10 three ways ($3.33, $3.33, $3.33) leaves a cent unaccounted for; one member's share must absorb the remainder deterministically.
- **Concurrent expense edits** — two people editing/deleting the same expense simultaneously must not corrupt the balance table; wrap balance updates in a transaction keyed by group.
- **Simplification ≠ original debts** — simplifying can technically have a person pay someone they never directly transacted with; product-wise this is usually fine but worth calling out as a tradeoff.

## 13. Interview Tips

- The debt simplification algorithm (creditors/debtors + greedy matching) is the signature part of this question — walk through it with a concrete numeric example if time allows.
- Emphasize that balances are precomputed on write, not recomputed from full history on every read — a common naive mistake is treating this as "sum all expenses every time you check a balance".
- Mention storing money as integer minor units (cents) to sidestep floating-point bugs; interviewers often listen for this detail specifically.
- Keep the system's overall scale modest in your explanation — this is a "clever small-graph algorithm" problem more than a "massive distributed system" problem, and treating it that way shows good judgment.

## 14. Summary

Splitwise's core is a lightweight, precomputed pairwise balance ledger updated transactionally with every expense, paired with a small but interview-favorite debt simplification algorithm that greedily matches the largest creditors and debtors to minimize the number of settling transactions. The system scales comfortably because each group's balance graph is small, letting simplification run on demand rather than needing heavyweight batch processing.
