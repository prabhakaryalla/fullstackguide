# 1487. Making File Names Unique

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Simulation

## Problem

Given an array `names` of proposed folder names created in order, whenever a name has already been used, append the smallest positive suffix `(k)` (checking `k = 1, 2, ...`) that produces a name not yet used, and use that instead. Return the final list of unique names actually assigned.

### Example

```
Input: names = ["pes","fifa","gta","pes(2019)"]
Output: ["pes","fifa","gta","pes(2019)"]
```

## Approach

Track every name already assigned in a hash set, and for each base name remember the next suffix number likely to work (as a hint, not a guarantee) in a counter map. When a name collides, start probing suffixes from the remembered hint, incrementing until an unused candidate is found (this keeps repeated collisions on the same base name from restarting the search from `1` every time). Record the assigned name and update the hint for next time.

## C# Solution

```csharp
public class Solution
{
    public string[] GetFolderNames(string[] names)
    {
        var used = new HashSet<string>();
        var nextSuffix = new Dictionary<string, int>();
        var result = new string[names.Length];

        for (int i = 0; i < names.Length; i++)
        {
            string name = names[i];

            if (!used.Contains(name))
            {
                result[i] = name;
                used.Add(name);
                nextSuffix[name] = 1;
            }
            else
            {
                int k = nextSuffix.GetValueOrDefault(name, 1);
                string candidate = $"{name}({k})";

                while (used.Contains(candidate))
                {
                    k++;
                    candidate = $"{name}({k})";
                }

                result[i] = candidate;
                used.Add(candidate);
                nextSuffix[name] = k + 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` amortized across all names.
- **Space:** `O(n)` for the used-name set and suffix hints.
