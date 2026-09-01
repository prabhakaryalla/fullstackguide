# 3766. Minimum Operations to Make Binary Palindrome

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Bit Manipulation

## Problem

Given an integer array `nums`, for each `nums[i]` you may increase or decrease it by 1 any number of times. A number is a "binary palindrome" if its binary representation (no leading zeros) reads the same forward and backward. Return an array `ans` where `ans[i]` is the minimum operations to turn `nums[i]` into a binary palindrome.

### Example

Input: `nums = [1,2,4]`
Output: `[0,1,1]`

## Approach

Since `nums[i] <= 5000`, precompute all binary palindromes in a safe range (e.g., up to 10000) and sort them. For each `nums[i]`, binary search for the closest palindromes on either side and return the smaller absolute difference.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinOperations(int[] nums) 
    {
        var palindromes = new List<int>();
        for (int v = 1; v <= 10000; v++)
        {
            string bin = Convert.ToString(v, 2);
            bool isPal = true;
            for (int i = 0, j = bin.Length - 1; i < j; i++, j--)
                if (bin[i] != bin[j]) { isPal = false; break; }
            if (isPal) palindromes.Add(v);
        }

        var ans = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++)
        {
            ans[i] = ClosestDistance(palindromes, nums[i]);
        }
        return ans;
    }

    private int ClosestDistance(List<int> palindromes, int target)
    {
        int lo = 0, hi = palindromes.Count - 1;
        int best = int.MaxValue;
        while (lo <= hi)
        {
            int mid = (lo + hi) / 2;
            best = Math.Min(best, Math.Abs(palindromes[mid] - target));
            if (palindromes[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(P log P + n log P) where P is the palindrome count in range
- **Space:** O(P)
