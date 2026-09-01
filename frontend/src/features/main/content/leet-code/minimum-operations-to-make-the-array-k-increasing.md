# 2111. Minimum Operations to Make the Array K-Increasing

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming

## Problem

An array is k-increasing if for every index i where `i + k < n`, `arr[i] <= arr[i+k]`. Return the minimum number of operations to make the array k-increasing, where each operation allows changing any element.

### Example

```
Input: arr = [5,4,3,2,1], k = 1
Output: 4
Explanation: Change arr to [1,1,1,1,1], requiring 4 operations.
```

## Approach

Split the array into k independent subsequences based on indices modulo k. For each subsequence, find the longest non-decreasing subsequence (LIS variant allowing duplicates). The minimum operations for that subsequence is (length - LIS length). Sum across all k subsequences.

## C# Solution

```csharp
public class Solution
{
    public int KIncreasing(int[] arr, int k)
    {
        int total = 0;
        for (int start = 0; start < k; start++)
        {
            var subseq = new List<int>();
            for (int i = start; i < arr.Length; i += k)
                subseq.Add(arr[i]);
            total += subseq.Count - LongestNonDecreasing(subseq);
        }
        return total;
    }
    
    private int LongestNonDecreasing(List<int> nums)
    {
        var tails = new List<int>();
        foreach (int num in nums)
        {
            int pos = BinarySearchRight(tails, num);
            if (pos == tails.Count)
                tails.Add(num);
            else
                tails[pos] = num;
        }
        return tails.Count;
    }
    
    private int BinarySearchRight(List<int> list, int target)
    {
        int left = 0, right = list.Count;
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (list[mid] <= target)
                left = mid + 1;
            else
                right = mid;
        }
        return left;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
