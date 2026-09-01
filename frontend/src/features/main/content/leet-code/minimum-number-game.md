# 2974. Minimum Number Game

**Difficulty:** Easy
**Category:** Array, Sorting, Greedy, Heap (Priority Queue)

## Problem

Alice and Bob play a game with an integer array `nums` of even length. They take turns (Alice first) removing the smallest element and placing it in a new array `arr`. Bob goes first in placement. Return the resulting array `arr`.

### Example

```
Input: nums = [5, 4, 2, 3]
Output: [3, 2, 5, 4]
Explanation:
- Round 1: Alice removes 2, Bob removes 3, Bob places 3, Alice places 2 -> arr = [3,2]
- Round 2: Alice removes 4, Bob removes 5, Bob places 5, Alice places 4 -> arr = [3,2,5,4]

Input: nums = [2,5]
Output: [5,2]
```

## Approach

Sort the array. Take elements in pairs. For each pair, Bob's element (larger) comes first, then Alice's (smaller). This is equivalent to swapping each consecutive pair in the sorted array.

## C# Solution

```csharp
public class Solution
{
    public int[] NumberGame(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        var arr = new int[n];

        for (int i = 0; i < n; i += 2)
        {
            arr[i] = nums[i + 1];     // Bob's element
            arr[i + 1] = nums[i];     // Alice's element
        }

        return arr;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n) for output array
