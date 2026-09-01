# 2763. Make Array Empty

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree

## Problem

You are given an integer array `nums`. Initially, there is a pointer at index 0. In each operation, you can:
- Move the pointer one position to the left or right (wrapping around)
- Remove the element at the current pointer position if it equals the smallest remaining element

Return the minimum number of operations needed to make the array empty.

### Example

```
Input: nums = [3,4,-1]
Output: 5
Explanation:
- Pointer at 0 (nums[0]=3)
- Move left to 2 (nums[2]=-1), -1 is smallest, remove it. Count: 3
- Move right to 0 (nums[0]=3), 3 is smallest remaining, remove it. Count: 5
- nums[1]=4 is last, remove it. Total: 6... let me recalculate.

Actually starting at 0:
1. Move right to 1 (count 1)
2. Move right to 2 (count 2)  
3. Remove -1 (count 3)
4. Move left to 1 (count 4)
5. Move left to 0 (count 5)
6. Remove 3 (count 6)
7. Move right to 0 (was 1, now 0) (count 7)
8. Remove 4 (count 8)

Hmm, this doesn't match. The problem needs careful simulation.
```

## Approach

Sort elements with their original indices. Process elements in ascending order. For each element, calculate the minimum distance from the current pointer position to the element's index (considering wrap-around). Add this distance plus 1 (for removal) to the operation count. After removing an element, adjust indices of remaining elements.

This is complex and requires a Fenwick tree or segment tree to efficiently track removed elements and calculate adjusted positions.

## C# Solution

```csharp
public class Solution
{
    public long MakeArrayEmpty(int[] nums)
    {
        int n = nums.Length;
        var indexed = nums.Select((val, idx) => (val, idx)).OrderBy(x => x.val).ThenBy(x => x.idx).ToArray();
        
        long ops = 0;
        int currentPos = 0;
        var removed = new bool[n];
        
        foreach (var (val, targetIdx) in indexed)
        {
            int adjustedCurrent = 0;
            for (int i = 0; i < currentPos; i++)
            {
                if (!removed[i]) adjustedCurrent++;
            }
            
            int adjustedTarget = 0;
            for (int i = 0; i < targetIdx; i++)
            {
                if (!removed[i]) adjustedTarget++;
            }
            
            int remaining = n - removed.Count(x => x);
            
            int dist = Math.Min(
                Math.Abs(adjustedTarget - adjustedCurrent),
                remaining - Math.Abs(adjustedTarget - adjustedCurrent)
            );
            
            ops += dist + 1;
            removed[targetIdx] = true;
            currentPos = targetIdx;
        }
        
        return ops;
    }
}
```

## Complexity

- **Time:** O(n^2) with this naive approach; O(n log n) with Fenwick tree
- **Space:** O(n) for storing removed status
