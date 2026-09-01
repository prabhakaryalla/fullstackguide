# 3388. Count Beautiful Splits in an Array

**Difficulty:** Medium
**Category:** Array, String Matching, Dynamic Programming

## Problem

Given an array `nums`, count the number of ways to split it into three contiguous, non-empty parts `nums1`, `nums2`, `nums3` such that `nums1` is a prefix of `nums2`, or `nums2` is a prefix of `nums3`.

### Example

Input: `nums = [1,1,2,1]`
Output: number of valid `(i, j)` split points where the prefix condition holds for `[0,i)`, `[i,j)`, `[j,n)`.

## Approach

Precompute a longest-common-prefix table `lcp[i][j]` (length of the common prefix of suffixes starting at `i` and `j`) via the recurrence `lcp[i][j] = nums[i]==nums[j] ? 1+lcp[i+1][j+1] : 0`. For every split pair `(i, j)` with `i < j < n`, check whether `nums1` (length `i`) is a prefix of `nums2` (length `j-i`) using `lcp[0][i] >= i`, or `nums2` is a prefix of `nums3` (length `n-j`) using `lcp[i][j] >= j-i`.

## C# Solution

```csharp
public class Solution 
{
    public int BeautifulSplits(int[] nums) 
    {
        int n = nums.Length;
        int[,] lcp = new int[n + 1, n + 1];
        for (int i = n - 1; i >= 0; i--) 
        {
            for (int j = n - 1; j >= 0; j--) 
            {
                if (nums[i] == nums[j])
                    lcp[i, j] = lcp[i + 1, j + 1] + 1;
            }
        }

        int count = 0;
        for (int i = 1; i < n - 1; i++) 
        {
            for (int j = i + 1; j < n; j++) 
            {
                int len1 = i, len2 = j - i, len3 = n - j;
                bool cond1 = len1 <= len2 && lcp[0, i] >= len1;
                bool cond2 = len2 <= len3 && lcp[i, j] >= len2;
                if (cond1 || cond2) count++;
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2)
