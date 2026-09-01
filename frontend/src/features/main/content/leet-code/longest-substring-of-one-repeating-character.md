# 2213. Longest Substring of One Repeating Character

**Difficulty:** Hard
**Category:** String, Segment Tree, Ordered Set

## Problem

You are given a string `s` and a 2D array `queryCharacters` and `queryIndices`. For each query, you update `s[queryIndices[i]]` to `queryCharacters[i]`, then return the length of the longest substring containing only one repeating character after that update.

### Example

```
Input: s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
Output: [3,3,4]
Explanation:
- After query 0: s = "bbbacc", longest = "bbb" (length 3)
- After query 1: s = "bbbccc", longest = "ccc" (length 3)
- After query 2: s = "bbbbcc", longest = "bbbb" (length 4)
```

## Approach

Maintain a data structure (such as a segment tree or ordered set) that tracks all maximal runs of identical characters. For each update, recompute affected runs and update the global maximum length efficiently.

## C# Solution

```csharp
public class Solution
{
    public int[] LongestRepeating(string s, string queryCharacters, int[] queryIndices)
    {
        int n = s.Length;
        char[] arr = s.ToCharArray();
        SortedSet<(int, int)> runs = new SortedSet<(int, int)>();
        
        int start = 0;
        for (int i = 1; i <= n; i++)
        {
            if (i == n || arr[i] != arr[i - 1])
            {
                runs.Add((start, i - 1));
                start = i;
            }
        }
        
        int q = queryCharacters.Length;
        int[] result = new int[q];
        
        for (int qi = 0; qi < q; qi++)
        {
            int idx = queryIndices[qi];
            char newChar = queryCharacters[qi];
            
            if (arr[idx] != newChar)
            {
                arr[idx] = newChar;
                
                var toRemove = runs.Where(r => r.Item1 <= idx && idx <= r.Item2).ToList();
                foreach (var r in toRemove) runs.Remove(r);
                
                if (toRemove.Count > 0)
                {
                    var old = toRemove[0];
                    if (old.Item1 < idx) runs.Add((old.Item1, idx - 1));
                    if (idx < old.Item2) runs.Add((idx + 1, old.Item2));
                }
                
                bool mergedLeft = false, mergedRight = false;
                if (idx > 0 && arr[idx - 1] == newChar)
                {
                    var left = runs.Where(r => r.Item2 == idx - 1).FirstOrDefault();
                    if (left != default)
                    {
                        runs.Remove(left);
                        runs.Add((left.Item1, idx));
                        mergedLeft = true;
                    }
                }
                
                if (idx < n - 1 && arr[idx + 1] == newChar)
                {
                    var right = runs.Where(r => r.Item1 == idx + 1).FirstOrDefault();
                    if (right != default)
                    {
                        runs.Remove(right);
                        var current = mergedLeft ? runs.Where(r => r.Item2 == idx).First() : default;
                        if (current != default)
                        {
                            runs.Remove(current);
                            runs.Add((current.Item1, right.Item2));
                        }
                        else
                        {
                            runs.Add((idx, right.Item2));
                        }
                        mergedRight = true;
                    }
                }
                
                if (!mergedLeft && !mergedRight) runs.Add((idx, idx));
            }
            
            result[qi] = runs.Max(r => r.Item2 - r.Item1 + 1);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(q * log n) for q queries with efficient run management.
- **Space:** O(n) for storing runs.
