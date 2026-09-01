# 169. Majority Element

**Difficulty:** Easy
**Category:** Array, Hash Table, Divide and Conquer, Sorting, Counting, Boyer-Moore Voting

## Problem

Given an array `nums` of size `n`, return the majority element — the value that appears more than `n / 2` times. The array is guaranteed to always have a majority element.

### Example

```
nums = [2,2,1,1,1,2,2] -> 2
nums = [3,2,3] -> 3
```

## Approach

Boyer-Moore voting: track a `candidate` and a `count`. When `count` hits `0`, adopt the current element as the new candidate. Increment `count` when the current element matches the candidate, decrement otherwise. Because the majority element appears more than half the time, it always "wins" this running tally by the end.

## C# Solution

```csharp
public class Solution
{
    public int MajorityElement(int[] nums)
    {
        int candidate = nums[0], count = 0;

        foreach (int num in nums)
        {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
