# 3267. Count Almost Equal Pairs II

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Enumeration

## Problem
You are given an array `nums` consisting of positive integers. Two integers `x` and `y` are called almost equal if both can become equal after performing the following operation **at most twice in total, and at most once on each number**: choose either `x` or `y` (but each number only once) and swap any two digits within that number (leading zeros are allowed after the swap). Return the number of pairs `(i, j)` with `i < j` such that `nums[i]` and `nums[j]` are almost equal.

This differs from the easier version of the problem, which allows the swap to be applied to only one of the two numbers (not both).

### Example

```
Input: nums = [1023, 2310, 3201]
Output: 3
Explanation: Every pair can be made equal using at most one swap on each number (e.g. 1023 -> 1230 and 2310 -> stays as 1230-reachable variant, etc.), so all 3 pairs among the 3 numbers count.
```

## Approach
Pad every number to the same digit length. For a padded string `s`, define its variant set `V(s)` as `s` itself plus every string reachable by swapping any two digit positions of `s`. Two numbers `x` and `y` are almost equal under this rule **if and only if** `V(x)` and `V(y)` share at least one common string — because a shared string `s'` means `x` can reach `s'` with at most one swap, and `y` can independently reach the very same `s'` with at most one swap.

Build a map from every variant string to the list of indices whose variant set contains it. Then, for each index `i`, union together (using a `HashSet<int>`) all indices `j > i` found across every variant of `nums[i]`; the size of that set is the number of indices that share at least one variant with `i`, which avoids double-counting pairs that share more than one common variant.

## C# Solution

```csharp
public class Solution 
{
    public long CountPairs(int[] nums) 
    {
        int n = nums.Length;
        int maxLen = 0;
        foreach (var num in nums) 
        {
            maxLen = Math.Max(maxLen, num.ToString().Length);
        }

        string[] padded = new string[n];
        for (int i = 0; i < n; i++) 
        {
            padded[i] = nums[i].ToString().PadLeft(maxLen, '0');
        }

        var groups = new Dictionary<string, List<int>>();
        var variantsPerIndex = new List<string>[n];

        for (int i = 0; i < n; i++) 
        {
            variantsPerIndex[i] = GetVariants(padded[i]);
            foreach (var variant in variantsPerIndex[i]) 
            {
                if (!groups.TryGetValue(variant, out var list)) 
                {
                    list = new List<int>();
                    groups[variant] = list;
                }
                list.Add(i);
            }
        }

        long pairs = 0;
        var connected = new HashSet<int>();

        for (int i = 0; i < n; i++) 
        {
            connected.Clear();
            foreach (var variant in variantsPerIndex[i]) 
            {
                foreach (var j in groups[variant]) 
                {
                    if (j > i) 
                    {
                        connected.Add(j);
                    }
                }
            }
            pairs += connected.Count;
        }

        return pairs;
    }

    private List<string> GetVariants(string s) 
    {
        var result = new HashSet<string> { s };
        var arr = s.ToCharArray();

        for (int i = 0; i < arr.Length; i++) 
        {
            for (int j = i + 1; j < arr.Length; j++) 
            {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                result.Add(new string(arr));
                (arr[i], arr[j]) = (arr[j], arr[i]);
            }
        }

        return result.ToList();
    }
}
```

## Complexity

- **Time:** O(n * d^2) to build the variant groups (where `d` is the padded digit length), plus O(n * d^2 * g) to deduplicate pairs, where `g` is the average size of a variant group.
- **Space:** O(n * d^2) for the variant-to-index map.
