# 3265. Count Almost Equal Pairs I

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Enumeration

## Problem

You are given an array `nums` consisting of positive integers. Two integers `x` and `y` are called almost equal if both can become equal after performing the following operation at most once: choose either `x` or `y` and swap any two digits within that number (leading zeros are allowed after the swap). Return the number of pairs `(i, j)` with `i < j` such that `nums[i]` and `nums[j]` are almost equal.

### Example

```
Input: nums = [3,12,30,17,21]
Output: 2
Explanation:
- (3,12): 30 (padded "03") after swapping digits becomes "30" which equals 30? Actually 3 and 30: pad "3" to "03", swap digits to get "30" which equals 30. So (0,2) i.e. nums[0]=3 and nums[2]=30 are almost equal.
- (30,21): swapping digits of 30 -> "03"/"30", swapping digits of 21 -> "12"; comparing padded forms shows they can match through single swaps as well.
```

## Approach

Since the numbers are small (fewer than 7 digits) and `n <= 100`, a brute-force check works. For each pair `(x, y)`: pad both numbers with leading zeros to the same length (the longer of the two), then check if they are already equal, or if swapping any two digit positions within one of the padded strings produces the other string. Try all `O(d^2)` digit-position swaps for both directions.

## C# Solution

```csharp
public class Solution 
{
    public int CountPairs(int[] nums) 
    {
        int n = nums.Length;
        int count = 0;

        for (int i = 0; i < n; i++) 
        {
            for (int j = i + 1; j < n; j++) 
            {
                if (AlmostEqual(nums[i], nums[j])) 
                {
                    count++;
                }
            }
        }

        return count;
    }

    private bool AlmostEqual(int x, int y) 
    {
        string sx = x.ToString();
        string sy = y.ToString();
        int len = Math.Max(sx.Length, sy.Length);
        sx = sx.PadLeft(len, '0');
        sy = sy.PadLeft(len, '0');

        if (sx == sy) return true;

        return CanMatchWithOneSwap(sx, sy) || CanMatchWithOneSwap(sy, sx);
    }

    private bool CanMatchWithOneSwap(string a, string b) 
    {
        char[] arr = a.ToCharArray();
        int n = arr.Length;

        for (int i = 0; i < n; i++) 
        {
            for (int j = i + 1; j < n; j++) 
            {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                if (new string(arr) == b) return true;
                (arr[i], arr[j]) = (arr[j], arr[i]);
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(n^2 * d^2) where d is the maximum number of digits (at most 7)
- **Space:** O(d)
