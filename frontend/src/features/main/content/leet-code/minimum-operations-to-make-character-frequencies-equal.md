# 3389. Minimum Operations to Make Character Frequencies Equal

**Difficulty:** Hard
**Category:** Hash Table, String, Dynamic Programming, Counting

## Problem
You are given a string `s` consisting of lowercase English letters.

A string `t` is called *good* if all characters that occur in `t` occur the same number of times.

You may perform any number of the following operations:
- Delete a character from `s`.
- Insert a character into `s`.
- Change a character in `s` to its next letter in the alphabet (you cannot change `'z'` to `'a'`).

Return the minimum number of operations required to make `s` good.

### Example
```
Input: s = "acab"
Output: 1
Explanation: Delete one occurrence of 'a' to make s = "cab", where every
remaining character occurs exactly once.
```
```
Input: s = "aaabc"
Output: 2
Explanation: Change one occurrence of 'a' to 'b' and insert one occurrence of
'c', resulting in a string where every remaining character occurs the same
number of times.
```

## Approach
Only the multiset of letter frequencies matters, not their order, so first compute `count[0..25]`, the occurrence count of each letter.

For a fixed target frequency `target`, decide for every letter `i` whether to make its count exactly `target` or exactly `0`. The cost to zero out letter `i` is `count[i]` deletions. The cost to bring it to exactly `target` is `|target - count[i]|` inserts/deletes -- but it can sometimes be cheaper to "shift" a surplus of letter `i` into letter `i+1` using the change operation, covering `i+1`'s deficit at the same time (one change operation fixes one unit of both letters simultaneously, rather than paying separately for a delete on `i` and an insert on `i+1`).

This is captured by a suffix DP: `dp[i]` is the minimum operations to make letters `i..25` good given the target. `dp[i] = min(zero-out i, bring i to target) + dp[i+1]`, with an extra transition that combines letter `i` and `i+1` via the shift trick and jumps to `dp[i+2]` when it's cheaper. Trying every possible `target` from `1` to `max(count)` and taking the best gives the final answer (target `0`, i.e. deleting every letter, is implicitly bounded by `s.Length` and used as the DP's baseline).

## C# Solution

```csharp
public class Solution 
{
    public int MakeStringGood(string s)
    {
        int ans = s.Length;
        var count = new int[26];
        foreach (char c in s)
            count[c - 'a']++;

        int mx = 0;
        foreach (int c in count)
            mx = Math.Max(mx, c);

        for (int target = 1; target <= mx; target++)
            ans = Math.Min(ans, GetMinOperations(count, target));

        return ans;
    }

    // dp[i] := minimum operations to make the frequency of letters i..25 equal to `target` or 0.
    private int GetMinOperations(int[] count, int target)
    {
        var dp = new int[27];

        for (int i = 25; i >= 0; i--)
        {
            int deleteAllToZero = count[i];
            int deleteOrInsertToTarget = Math.Abs(target - count[i]);
            dp[i] = Math.Min(deleteAllToZero, deleteOrInsertToTarget) + dp[i + 1];

            if (i + 1 < 26 && count[i + 1] < target)
            {
                int nextDeficit = target - count[i + 1];
                int needToChange = count[i] > target ? count[i] - target : count[i];
                int changeToTarget = nextDeficit > needToChange
                    ? needToChange + (nextDeficit - needToChange)
                    : nextDeficit + (needToChange - nextDeficit);
                dp[i] = Math.Min(dp[i], changeToTarget + dp[i + 2]);
            }
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** O(26n), n candidate targets each resolved in O(26) time.
- **Space:** O(26) for the count array and DP table.
