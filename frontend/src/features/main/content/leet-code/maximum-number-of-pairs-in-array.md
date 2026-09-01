# 2341. Maximum Number of Pairs in Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given a 0-indexed integer array `nums`. In one operation, you may do the following:

- Choose two integers in `nums` that are equal.
- Remove both integers from `nums`, forming a pair.

The operation is done on `nums` as many times as possible.

Return a 0-indexed integer array `answer` of size `2` where `answer[0]` is the number of pairs that are formed and `answer[1]` is the number of leftover integers in `nums` after doing the operation as many times as possible.

### Example

```
Input: nums = [1,3,2,1,3,2,2]
Output: [3,1]
Explanation: Form pairs (1,1), (3,3), (2,2). One 2 remains.
```

## Approach

Count the frequency of each number. For each unique number with frequency `f`, we can form `f / 2` pairs, leaving `f % 2` leftovers. Sum all pairs and leftovers.

## C# Solution

```csharp
public class Solution
{
    public int[] NumberOfPairs(int[] nums)
    {
        var freq = new Dictionary<int, int>();
        foreach (int num in nums)
        {
            if (!freq.ContainsKey(num))
                freq[num] = 0;
            freq[num]++;
        }
        
        int pairs = 0, leftovers = 0;
        foreach (int count in freq.Values)
        {
            pairs += count / 2;
            leftovers += count % 2;
        }
        
        return new int[] { pairs, leftovers };
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
