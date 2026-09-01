# 2465. Number of Distinct Averages

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

You are given a 0-indexed integer array `nums` of even length. Repeatedly perform the following operation until `nums` becomes empty:

- Remove the smallest element and the largest element in `nums`
- Calculate the average of the two removed elements

Return the number of distinct averages calculated using this process.

### Example

```
Input: nums = [4,1,4,0,3,5]
Output: 2
Explanation:
1. Remove 0 and 5, average = 2.5
2. Remove 1 and 4, average = 2.5
3. Remove 3 and 4, average = 3.5
Distinct averages: {2.5, 3.5} = 2
```

## Approach

Sort the array, then use two pointers from both ends to pair smallest with largest. Calculate the average for each pair (can use sum to avoid floating point) and store in a hash set. Return the set size.

## C# Solution

```csharp
public class Solution
{
    public int DistinctAverages(int[] nums)
    {
        Array.Sort(nums);
        var averages = new HashSet<double>();
        
        int left = 0;
        int right = nums.Length - 1;
        
        while (left < right)
        {
            double avg = (nums[left] + nums[right]) / 2.0;
            averages.Add(avg);
            left++;
            right--;
        }
        
        return averages.Count;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the hash set in worst case
