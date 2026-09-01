# 1111. Maximum Nesting Depth of Two Valid Parentheses Strings

**Difficulty:** Medium
**Category:** String, Stack

## Problem

A valid parentheses string `seq` can always be split into two disjoint valid parentheses subsequences `A` and `B` whose concatenation (interleaved in original order) reproduces `seq`. Choose a split that minimizes `max(depth(A), depth(B))`, where `depth` is the maximum nesting depth of a valid parentheses string. Return an array `answer` where `answer[i] = 0` if character `i` belongs to `A`, or `1` if it belongs to `B`.

### Example

```
Input: seq = "(()())"
Output: [0,1,1,1,1,0]
```

## Approach

Track the running nesting `depth` while scanning the string. Assign every `(` to a group based on the depth *after* incrementing (so odd depths go to one group, even depths to the other), and assign every `)` to a group based on the depth *before* decrementing. Alternating parity between the two groups automatically balances the maximum depth each group experiences.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxDepthAfterSplit(string seq)
    {
        int[] answer = new int[seq.Length];
        int depth = 0;

        for (int i = 0; i < seq.Length; i++)
        {
            if (seq[i] == '(')
            {
                depth++;
                answer[i] = depth % 2;
            }
            else
            {
                answer[i] = depth % 2;
                depth--;
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the answer array.
