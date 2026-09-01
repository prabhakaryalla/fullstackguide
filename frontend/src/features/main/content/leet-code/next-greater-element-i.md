# 496. Next Greater Element I

**Difficulty:** Easy
**Category:** Array, Hash Table, Stack, Monotonic Stack

## Problem

Given two arrays `nums1` and `nums2` where `nums1` is a subset of `nums2`, for each element of `nums1` find the next greater element in `nums2` (the first element to its right in `nums2` that is greater), or `-1` if none exists.

### Example

```
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
```

### Constraints

- `1 <= nums1.length <= nums2.length <= 1000`
- All integers in `nums1` and `nums2` are unique.
- All integers in `nums1` also appear in `nums2`.

## Approach

Precompute the "next greater element" for every value in `nums2` using a monotonic decreasing stack: scan left to right, and whenever the current number exceeds the stack's top, that top's next greater element has been found (pop and record it), repeating until the stack top is no longer smaller. Then simply look up each value of `nums1` in the resulting map.

## C# Solution

```csharp
public class Solution
{
    public int[] NextGreaterElement(int[] nums1, int[] nums2)
    {
        var nextGreater = new Dictionary<int, int>();
        var stack = new Stack<int>();

        foreach (var num in nums2)
        {
            while (stack.Count > 0 && stack.Peek() < num)
                nextGreater[stack.Pop()] = num;

            stack.Push(num);
        }

        var result = new int[nums1.Length];
        for (int i = 0; i < nums1.Length; i++)
            result[i] = nextGreater.GetValueOrDefault(nums1[i], -1);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n)` for the map and stack.
