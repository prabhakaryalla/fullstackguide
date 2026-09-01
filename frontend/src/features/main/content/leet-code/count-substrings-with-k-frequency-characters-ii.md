# 3329. Count Substrings With K-Frequency Characters II

**Difficulty:** Hard
**Category:** Hash Table, String, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a string `s` and an integer `k`, return the total number of substrings of `s` where at least one character appears at least `k` times. This is the same task as "Count Substrings With K-Frequency Characters I", but with a much larger string length, so the solution must run in linear time.

### Example

Input: `s = "abacb", k = 2`

Output: `4`

Explanation: The valid substrings are `"aba"`, `"abac"`, `"abacb"`, and `"bacb"`.

## Approach
Use a two-pointer sliding window that never resets: for each left endpoint, advance the right pointer only as far as needed until some character's frequency in the window first reaches `k`. Every substring starting at `left` and extending at least that far also qualifies, contributing `n - right` valid substrings for that `left`. As `left` advances, only decrement the count of the character leaving the window, and continue extending `right` from where it left off — both pointers move forward monotonically, giving an overall linear scan.

## C# Solution

```csharp
public class Solution 
{
    public long NumberOfSubstrings(string s, int k) 
    {
        int n = s.Length;
        int[] count = new int[26];
        long ans = 0;
        int right = 0;
        int maxCount = 0;

        for (int left = 0; left < n; left++) 
        {
            if (right < left) 
            {
                right = left;
                maxCount = 0;
            }

            while (right < n && maxCount < k) 
            {
                int idx = s[right] - 'a';
                count[idx]++;
                maxCount = Math.Max(maxCount, count[idx]);
                right++;
            }

            if (maxCount >= k) 
            {
                ans += n - right + 1;
            }

            int leftIdx = s[left] - 'a';
            count[leftIdx]--;
            if (count[leftIdx] == maxCount - 1) maxCount--;
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) (fixed-size 26-letter count array)
