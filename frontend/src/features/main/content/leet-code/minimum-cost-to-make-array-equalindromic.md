# 2967. Minimum Cost to Make Array Equalindromic

**Difficulty:** Medium
**Category:** Array, Math, Sorting

## Problem

You are given a 0-indexed integer array `nums` of odd length. In one operation you can change any element to any value. The array is called **equalindromic** if all its elements equal some palindromic number `x`. The cost of making it equalindromic is the sum of `|nums[i] - x|` over all elements. Return the minimum possible cost.

### Example

`nums = [10,12,13,14,15]` → answer `11` (choosing `x = 11`, cost `= 1+1+2+3+4 = 11`).

## Approach

Ignoring the palindrome requirement, the value that minimizes `sum(|nums[i] - x|)` is the **median** of `nums`. Since the cost function is convex (piecewise linear, minimized at the median and increasing as `x` moves away), the best palindromic `x` is either the closest palindrome `<= median` or the closest palindrome `>= median`.

Find both candidates by constructing palindromes directly from the digits of the median: take the first half of its digits, mirror them to build a candidate palindrome of the same length, and adjust the half up or down by one (handling digit-count boundary cases such as `999 -> 1000` or `100 -> 99`) to get the nearest palindrome on each side. Compute the total cost for both candidates and return the smaller one.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumCost(int[] nums) 
    {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        long median = sorted[n / 2];

        long lower = LargestPalindromeAtMost(median);
        long upper = SmallestPalindromeAtLeast(median);

        long costLower = 0;
        long costUpper = 0;
        foreach (int num in nums)
        {
            costLower += Math.Abs(num - lower);
            costUpper += Math.Abs(num - upper);
        }

        return Math.Min(costLower, costUpper);
    }

    private long BuildPalindrome(long half, int length)
    {
        string h = half.ToString();
        char[] arr = new char[length];
        for (int i = 0; i < h.Length; i++)
        {
            arr[i] = h[i];
            arr[length - 1 - i] = h[i];
        }
        return long.Parse(new string(arr));
    }

    private long PowerOf10(int exponent)
    {
        long result = 1;
        for (int i = 0; i < exponent; i++)
        {
            result *= 10;
        }
        return result;
    }

    private long LargestPalindromeAtMost(long x)
    {
        string s = x.ToString();
        int length = s.Length;
        int halfLen = (length + 1) / 2;
        long half = long.Parse(s.Substring(0, halfLen));

        long candidate = BuildPalindrome(half, length);
        if (candidate <= x)
        {
            return candidate;
        }

        half--;
        if (halfLen > 1 && half < PowerOf10(halfLen - 1))
        {
            return PowerOf10(length - 1) - 1;
        }
        return BuildPalindrome(half, length);
    }

    private long SmallestPalindromeAtLeast(long x)
    {
        string s = x.ToString();
        int length = s.Length;
        int halfLen = (length + 1) / 2;
        long half = long.Parse(s.Substring(0, halfLen));

        long candidate = BuildPalindrome(half, length);
        if (candidate >= x)
        {
            return candidate;
        }

        half++;
        if (half >= PowerOf10(halfLen))
        {
            return PowerOf10(length) + 1;
        }
        return BuildPalindrome(half, length);
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, plus O(log(max(nums))) for palindrome construction
- **Space:** O(n)
