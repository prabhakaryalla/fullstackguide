# 2157. Groups of Strings

**Difficulty:** Hard
**Category:** Array, String, Bit Manipulation, Union Find

## Problem

You are given an array of strings `words`. Each string can be converted to another by adding, removing, or replacing one letter.

Return a 2-element array:
- The number of groups (connected components of convertible strings)
- The size of the largest group

### Example

```
Input: words = ["a","b","ab","cde"]
Output: [2,3]
Explanation: Two groups: {a,b,ab} and {cde}
```

## Approach

Use Union-Find with bitmasks. Represent each word as a bitmask of which letters it contains. Two words can be connected if:
- They differ by exactly one bit (add/remove one letter), or
- They have the same bitmask (replace operation doesn't change letter set)

For each word's bitmask, try adding/removing each possible letter and check if that configuration exists.

## C# Solution

```csharp
public class Solution
{
    public int[] GroupStrings(string[] words)
    {
        var maskToId = new Dictionary<int, int>();
        var parent = new Dictionary<int, int>();
        var size = new Dictionary<int, int>();
        
        int id = 0;
        foreach (var word in words)
        {
            int mask = 0;
            foreach (char c in word)
            {
                mask |= (1 << (c - 'a'));
            }
            
            if (!maskToId.ContainsKey(mask))
            {
                maskToId[mask] = id;
                parent[id] = id;
                size[id] = 1;
                id++;
            }
        }
        
        // Try connecting masks
        foreach (var mask in maskToId.Keys.ToList())
        {
            // Try removing each bit
            for (int i = 0; i < 26; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    int newMask = mask ^ (1 << i);
                    if (maskToId.ContainsKey(newMask))
                    {
                        Union(maskToId[mask], maskToId[newMask], parent, size);
                    }
                }
                else
                {
                    // Try adding this bit
                    int newMask = mask | (1 << i);
                    if (maskToId.ContainsKey(newMask))
                    {
                        Union(maskToId[mask], maskToId[newMask], parent, size);
                    }
                }
            }
            
            // Try replacing one bit with another
            for (int i = 0; i < 26; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    for (int j = 0; j < 26; j++)
                    {
                        if (i != j && (mask & (1 << j)) == 0)
                        {
                            int newMask = (mask ^ (1 << i)) | (1 << j);
                            if (maskToId.ContainsKey(newMask))
                            {
                                Union(maskToId[mask], maskToId[newMask], parent, size);
                            }
                        }
                    }
                }
            }
        }
        
        var groups = new HashSet<int>();
        int maxSize = 0;
        
        foreach (var id in parent.Keys)
        {
            int root = Find(id, parent);
            groups.Add(root);
            maxSize = Math.Max(maxSize, size[root]);
        }
        
        return new int[] { groups.Count, maxSize };
    }
    
    private int Find(int x, Dictionary<int, int> parent)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x], parent);
        return parent[x];
    }
    
    private void Union(int x, int y, Dictionary<int, int> parent, Dictionary<int, int> size)
    {
        int rootX = Find(x, parent);
        int rootY = Find(y, parent);
        
        if (rootX != rootY)
        {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        }
    }
}
```

## Complexity

- **Time:** O(n * 26²) where n is the number of words
- **Space:** O(n) for Union-Find structures
