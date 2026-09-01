# 3354. Make Array Elements Equal to Zero

**Difficulty:** Easy
**Category:** Array, Simulation, Two Pointers

## Problem
You are given an integer array `nums`. A **selection** consists of a starting index `curr` (where `nums[curr] == 0`) and an initial direction (left or right). Starting from `curr`, a pointer repeatedly does the following until it moves out of bounds: if the value at the current position is `0`, it moves one step in the current direction; otherwise, it decrements the value at the current position by 1, reverses direction, and then moves one step. Count the number of `(curr, direction)` selections for which every element of the array eventually becomes `0`.

## Approach
Since `nums` is small, simulate the process directly for every zero-valued starting index and both possible initial directions, working on a fresh copy of the array each time, and check whether the array ends up entirely zero once the pointer walks off either end.

## C# Solution

```csharp
public class Solution 
{
    public int CountValidSelections(int[] nums) 
    {
        int n = nums.Length;
        int count = 0;

        for (int start = 0; start < n; start++) 
        {
            if (nums[start] != 0) continue;
            if (Simulate(nums, start, 1)) count++;
            if (Simulate(nums, start, -1)) count++;
        }
        return count;
    }

    private bool Simulate(int[] nums, int curr, int dir) 
    {
        int[] arr = (int[])nums.Clone();
        while (curr >= 0 && curr < arr.Length) 
        {
            if (arr[curr] == 0) 
            {
                curr += dir;
            } 
            else 
            {
                arr[curr]--;
                dir = -dir;
                curr += dir;
            }
        }

        foreach (int v in arr) 
        {
            if (v != 0) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2) — up to `n` starting positions, each simulated in O(n).
- **Space:** O(n) per simulation
