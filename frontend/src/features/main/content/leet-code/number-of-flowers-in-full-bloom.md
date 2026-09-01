# 2251. Number of Flowers in Full Bloom

**Difficulty:** Hard
**Category:** Array, Hash Table, Binary Search, Prefix Sum, Sorting, Ordered Set

## Problem

You are given a 2D integer array `flowers` where `flowers[i] = [starti, endi]` means the i-th flower is in full bloom from `starti` to `endi` (inclusive). You are also given an integer array `people` where `people[i]` is the time the i-th person arrives. Return an array where the i-th element is the number of flowers in full bloom when the i-th person arrives.

### Example

```
Input: flowers = [[1,6],[3,7],[9,12],[4,13]], people = [2,3,7,11]
Output: [1,2,2,2]
```

## Approach

Create two sorted arrays: one for bloom start times and one for end times. For each person's arrival time, use binary search to count how many flowers have started (start <= time) and how many have ended (end < time). The difference is the number of flowers in bloom.

## C# Solution

```csharp
public class Solution
{
    public int[] FullBloomFlowers(int[][] flowers, int[] people)
    {
        var starts = new List<int>();
        var ends = new List<int>();
        
        foreach (var flower in flowers)
        {
            starts.Add(flower[0]);
            ends.Add(flower[1]);
        }
        
        starts.Sort();
        ends.Sort();
        
        int[] result = new int[people.Length];
        for (int i = 0; i < people.Length; i++)
        {
            int time = people[i];
            int started = BinarySearchUpper(starts, time);
            int ended = BinarySearchLower(ends, time);
            result[i] = started - ended;
        }
        
        return result;
    }
    
    private int BinarySearchUpper(List<int> arr, int target)
    {
        int left = 0, right = arr.Count;
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] <= target) left = mid + 1;
            else right = mid;
        }
        return left;
    }
    
    private int BinarySearchLower(List<int> arr, int target)
    {
        int left = 0, right = arr.Count;
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] < target) left = mid + 1;
            else right = mid;
        }
        return left;
    }
}
```

## Complexity

- **Time:** O((m + n) log m) where m is the number of flowers and n is the number of people
- **Space:** O(m)
