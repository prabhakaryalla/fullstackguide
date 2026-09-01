# 3747. Count Distinct Integers After Removing Zeros

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given an integer array `nums`, remove every `'0'` digit from the decimal representation of each element, then count how many distinct resulting values remain.

### Example

nums = [102, 20, 12] → 102 → "12", 20 → "2", 12 → "12". Distinct results: {"12", "2"} → 2.

## Approach

For each number, convert it to a string, filter out `'0'` characters, and parse the remainder back into an integer (numbers that become entirely zeros reduce to 0). Insert every transformed value into a hash set and return its size.

## C# Solution

```csharp
public class Solution 
{
    public int CountDistinctAfterRemovingZeros(int[] nums) 
    {
        var distinct = new HashSet<long>();
        foreach (int num in nums) 
        {
            string filtered = new string(num.ToString().Where(c => c != '0').ToArray());
            long value = filtered.Length == 0 ? 0 : long.Parse(filtered);
            distinct.Add(value);
        }
        return distinct.Count;
    }
}
```

## Complexity

- **Time:** O(n * d), where d is the average number of digits
- **Space:** O(n)
