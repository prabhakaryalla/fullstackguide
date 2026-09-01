# 1044. Longest Duplicate Substring

**Difficulty:** Hard
**Category:** String, Binary Search, Suffix Array, Sliding Window, Hashing, Rolling Hash

## Problem

Given a string `s`, return the longest substring that occurs at least twice in `s`. Return an empty string if no such substring exists.

### Example

```
Input: s = "banana"
Output: "ana"
```

## Approach

Binary search on the candidate substring length: if a duplicate exists at length `L`, one also exists at every shorter length (truncate it), so feasibility is monotonic and binary search applies. For a fixed length `L`, use a rolling hash (Rabin-Karp) to hash every length-`L` window in `O(1)` per step, storing window start positions by hash in a dictionary. Whenever a hash collision is found, verify actual character equality (to guard against false positives) before declaring a duplicate. Track the best length and starting index found across the search.

## C# Solution

```csharp
public class Solution
{
    public string LongestDupSubstring(string s)
    {
        int n = s.Length;
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = s[i] - 'a';

        long baseValue = 26;
        long modulus = 1_000_000_007L;

        int low = 1, high = n - 1;
        int start = -1;
        int bestLength = 0;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            int foundStart = SearchDuplicate(nums, mid, baseValue, modulus);

            if (foundStart != -1)
            {
                start = foundStart;
                bestLength = mid;
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }

        return start == -1 ? "" : s.Substring(start, bestLength);
    }

    private int SearchDuplicate(int[] nums, int length, long baseValue, long modulus)
    {
        int n = nums.Length;
        if (length == 0) return -1;

        long hash = 0;
        for (int i = 0; i < length; i++) hash = (hash * baseValue + nums[i]) % modulus;

        long highestPower = 1;
        for (int i = 0; i < length - 1; i++) highestPower = (highestPower * baseValue) % modulus;

        var seen = new Dictionary<long, List<int>> { [hash] = new List<int> { 0 } };

        for (int start = 1; start + length <= n; start++)
        {
            hash = (hash - nums[start - 1] * highestPower % modulus + modulus) % modulus;
            hash = (hash * baseValue + nums[start + length - 1]) % modulus;

            if (seen.TryGetValue(hash, out var positions))
            {
                foreach (var pos in positions)
                {
                    bool equal = true;
                    for (int k = 0; k < length; k++)
                    {
                        if (nums[pos + k] != nums[start + k]) { equal = false; break; }
                    }
                    if (equal) return start;
                }
                positions.Add(start);
            }
            else
            {
                seen[hash] = new List<int> { start };
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n log n)` expected — binary search over lengths with an `O(n)` rolling-hash scan per length.
- **Space:** `O(n)` for the hash dictionary.
