# 2933. High-Access Employees

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

You are given a list of access logs where each log is `[name, time]`. An employee is high-access if they have three or more accesses within any one-hour window. Return a list of all high-access employees in any order.

### Example

```
Input: access_times = [["alice","0100"],["alice","0200"],["alice","0300"],["bob","0400"]]
Output: ["alice"]
Explanation: Alice has 3 accesses within 1 hour (0100 to 0159 contains 0100).
```

## Approach

Group access times by employee. For each employee, sort their access times and use a sliding window to check if any window of 3 consecutive accesses spans less than 60 minutes. If so, mark that employee as high-access.

## C# Solution

```csharp
public class Solution 
{
    public IList<string> FindHighAccessEmployees(IList<IList<string>> access_times) 
    {
        var groups = new Dictionary<string, List<int>>();
        
        foreach (var log in access_times) 
        {
            string name = log[0];
            int time = int.Parse(log[1]);
            
            if (!groups.ContainsKey(name)) 
            {
                groups[name] = new List<int>();
            }
            groups[name].Add(time);
        }
        
        var result = new List<string>();
        
        foreach (var kvp in groups) 
        {
            var times = kvp.Value;
            times.Sort();
            
            for (int i = 0; i + 2 < times.Count; i++) 
            {
                if (times[i + 2] - times[i] < 100) 
                {
                    result.Add(kvp.Key);
                    break;
                }
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n)
