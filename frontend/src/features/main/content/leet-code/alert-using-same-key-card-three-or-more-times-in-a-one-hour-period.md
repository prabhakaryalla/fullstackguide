# 1604. Alert Using Same Key-Card Three or More Times in a One Hour Period

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

## Problem

Given parallel arrays `keyName` and `keyTime` recording employee badge swipes, return the sorted list of names of employees who used their key card three or more times within any 60-minute (inclusive) window in a single day.

### Example

```
Input: keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"],
       keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
Output: ["daniel"]
```

## Approach

Convert each time string to minutes since midnight and group by name. Sort each employee's times, then slide a window of size 3 (compare `times[i]` with `times[i - 2]`); if the gap is at most 60 minutes, flag that employee. Sort the resulting names alphabetically.

## C# Solution

```csharp
public class Solution
{
    public IList<string> AlertNames(string[] keyName, string[] keyTime)
    {
        var timesByName = new Dictionary<string, List<int>>();

        for (int i = 0; i < keyName.Length; i++)
        {
            string[] parts = keyTime[i].Split(':');
            int minutes = int.Parse(parts[0]) * 60 + int.Parse(parts[1]);

            if (!timesByName.TryGetValue(keyName[i], out var list))
            {
                list = new List<int>();
                timesByName[keyName[i]] = list;
            }

            list.Add(minutes);
        }

        var result = new List<string>();

        foreach (var pair in timesByName)
        {
            var times = pair.Value;
            times.Sort();

            for (int i = 2; i < times.Count; i++)
            {
                if (times[i] - times[i - 2] <= 60)
                {
                    result.Add(pair.Key);
                    break;
                }
            }
        }

        result.Sort(StringComparer.Ordinal);
        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting per-employee times.
- **Space:** `O(n)` for the grouping map.
