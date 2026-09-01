# 1814. Count Nice Pairs in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Math

## Problem

Given an array `nums`, a pair `(i, j)` with `i < j` is nice if `nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])`, where `rev(x)` reverses the decimal digits of `x`. Return the number of nice pairs modulo `1e9 + 7`.

### Example

```
Input: nums = [42,11,1,97]
Output: 2
Explanation: (0,3) and (1,2) are nice pairs since 42 - rev(42) == 97 - rev(97), and 11 - rev(11) == 1 - rev(1).
```

## Approach

Rearranging the nice-pair condition gives `nums[i] - rev(nums[i]) == nums[j] - rev(nums[j])`, so two indices form a nice pair exactly when they share the same value of `num - rev(num)`. Compute this key for every number, and use a running frequency map: for each number, add the current count of its key to the answer (it pairs niceLY with every earlier number sharing that key), then increment the key's count.

## C# Solution

```csharp
public class Solution
{
    public int CountNicePairs(int[] nums)
    {
        const int Mod = 1_000_000_007;
        var counts = new Dictionary<int, int>();
        long result = 0;

        foreach (int num in nums)
        {
            int diff = num - Reverse(num);
            counts.TryGetValue(diff, out int existing);
            result = (result + existing) % Mod;
            counts[diff] = existing + 1;
        }

        return (int)result;
    }

    private int Reverse(int num)
    {
        long rev = 0;
        while (num > 0)
        {
            rev = rev * 10 + num % 10;
            num /= 10;
        }
        return (int)rev;
    }
}
```

## Complexity

- **Time:** `O(n * d)` where `d` is the average digit count (bounded, so effectively `O(n)`).
- **Space:** `O(n)` for the frequency map.
