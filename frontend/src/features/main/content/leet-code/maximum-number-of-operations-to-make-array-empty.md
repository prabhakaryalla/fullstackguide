# 2818. Maximum Number of Operations to Make Array Empty

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

You are given a 0-indexed array `nums` consisting of positive integers. You can do the following operation any number of times:

- Remove 2 elements with equal value, or
- Remove 3 elements with equal value

Return the minimum number of operations required to make the array empty, or `-1` if it is impossible.

### Example

```
Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation:
- Remove three 2's (operation 1)
- Remove two 3's (operation 2)
- Remove two 2's (operation 3)
- Remove two 4's (operation 4)
```

## Approach

1. Count the frequency of each number
2. For each frequency `f`:
   - If `f == 1`, return -1 (impossible)
   - Otherwise, calculate minimum operations: `(f + 2) / 3`
   - This greedy approach: use as many 3-removals as possible, then 2-removals
3. Sum all operations

The formula works because:
- f=2: 1 operation (remove 2)
- f=3: 1 operation (remove 3)
- f=4: 2 operations (remove 2, remove 2)
- f=5: 2 operations (remove 3, remove 2)
- f=6: 2 operations (remove 3, remove 3)
- Pattern: (f + 2) / 3

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        var freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        int operations = 0;
        
        foreach (int count in freq.Values)
        {
            if (count == 1)
            {
                return -1;
            }
            operations += (count + 2) / 3;
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n) for counting frequencies
- **Space:** O(n) for the frequency map
