# 2453. Destroy Sequential Targets

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem

You are given a 0-indexed array `nums` of positive integers and a positive integer `space`. For each seed value `seed` in `nums`, you can destroy all values `x` where `x ≡ seed (mod space)` (i.e., `(x - seed) % space == 0`).

Return the smallest seed value that destroys the maximum number of targets.

### Example

```
Input: nums = [3,7,8,1,1,5], space = 2
Output: 1
Explanation:
seed=1: destroys {1,1,3,5,7} (5 targets, all odd)
seed=3: destroys {1,1,3,5,7} (5 targets)
seed=8: destroys {8} (1 target)
Return 1 (smallest seed with max count).
```

## Approach

Group numbers by their remainder when divided by `space`. For each remainder class, count how many numbers belong to it. The answer is the minimum number in the remainder class that has the maximum count.

## C# Solution

```csharp
public class Solution
{
    public int DestroyTargets(int[] nums, int space)
    {
        var remainderMap = new Dictionary<int, List<int>>();
        
        foreach (int num in nums)
        {
            int rem = num % space;
            if (!remainderMap.ContainsKey(rem))
            {
                remainderMap[rem] = new List<int>();
            }
            remainderMap[rem].Add(num);
        }
        
        int maxCount = 0;
        int result = int.MaxValue;
        
        foreach (var kvp in remainderMap)
        {
            int count = kvp.Value.Count;
            int minInGroup = kvp.Value.Min();
            
            if (count > maxCount || (count == maxCount && minInGroup < result))
            {
                maxCount = count;
                result = minInGroup;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for the hash map
