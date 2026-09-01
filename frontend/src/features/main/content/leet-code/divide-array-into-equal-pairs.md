# 2206. Divide Array Into Equal Pairs

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given an integer array `nums` consisting of `2 * n` integers. You need to divide `nums` into `n` pairs such that:
- Each element belongs to exactly one pair
- The elements in each pair are equal

Return `true` if `nums` can be divided into `n` pairs, otherwise return `false`.

### Example

```
Input: nums = [3,2,3,2,2,2]
Output: true
Explanation: We can divide into pairs: (3,3), (2,2), (2,2).
```

## Approach

For the array to be dividable into equal pairs, every unique number must appear an even number of times.

1. Count the frequency of each number
2. Check if all frequencies are even

## C# Solution

```csharp
public class Solution
{
    public bool DivideArray(int[] nums)
    {
        Dictionary<int, int> freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        foreach (int count in freq.Values)
        {
            if (count % 2 != 0)
            {
                return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the array
- **Space:** O(k), where k is the number of unique elements
