# 350. Intersection of Two Arrays II

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Binary Search, Sorting

## Problem

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays, and the result may be in any order.

### Example

```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```

### Constraints

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

## Approach

Count the occurrences of every value in `nums1` in a dictionary. Scan `nums2`, and whenever a value has a remaining positive count, add it to the result and decrement its count, ensuring each match is only used once per array.

## C# Solution

```csharp
public class Solution
{
    public int[] Intersect(int[] nums1, int[] nums2)
    {
        var counts = new Dictionary<int, int>();
        foreach (var num in nums1)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        var result = new List<int>();
        foreach (var num in nums2)
        {
            if (counts.TryGetValue(num, out var count) && count > 0)
            {
                result.Add(num);
                counts[num] = count - 1;
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n)` for the count dictionary.
