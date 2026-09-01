# 1452. People Whose List of Favorite Companies Is Not a Subset of Another List

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given `favoriteCompanies`, where `favoriteCompanies[i]` is the list of companies person `i` likes, return the indices of the people whose list of favorite companies is **not** a subset of any other person's list.

### Example

```
Input: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["google","facebook"]]
Output: [0,1,4]
```

## Approach

Convert each person's list into a hash set for fast subset checks. For every person `i`, compare against every other person `j`: if `i`'s set is smaller than `j`'s and fully contained within it, person `i` is excluded from the result. Otherwise, include `i`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> PeopleIndexes(IList<IList<string>> favoriteCompanies)
    {
        int n = favoriteCompanies.Count;
        var sets = favoriteCompanies.Select(l => new HashSet<string>(l)).ToList();
        var result = new List<int>();

        for (int i = 0; i < n; i++)
        {
            bool isSubset = false;

            for (int j = 0; j < n; j++)
            {
                if (i == j) continue;

                if (sets[i].Count < sets[j].Count && sets[i].IsSubsetOf(sets[j]))
                {
                    isSubset = true;
                    break;
                }
            }

            if (!isSubset) result.Add(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2 * m)` where `m` is the average list size.
- **Space:** `O(n * m)` for the hash sets.
