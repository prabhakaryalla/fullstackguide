# 3289. The Two Sneaky Numbers of Digitville

**Difficulty:** Easy
**Category:** Array, Hash Table, Bit Manipulation

## Problem

In Digitville, an array `nums` of length `n + 2` contains integers from `0` to `n - 1`, where every number appears exactly once except two "sneaky" numbers that each appear exactly twice. Return an array containing the two sneaky numbers, in any order.

### Example

```
Input: nums = [0,1,1,0]
Output: [0,1]
```

## Approach

Count the occurrences of each value using a hash map (or a frequency array of size `n`). Any value with a count of exactly `2` is one of the sneaky numbers. Collect both such values into the result.

## C# Solution

```csharp
public class Solution 
{
    public int[] GetSneakyNumbers(int[] nums) 
    {
        var count = new Dictionary<int, int>();

        foreach (int num in nums) 
        {
            count.TryGetValue(num, out int c);
            count[num] = c + 1;
        }

        var result = new List<int>();
        foreach (var kvp in count) 
        {
            if (kvp.Value == 2) 
            {
                result.Add(kvp.Key);
            }
        }

        result.Sort();
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
