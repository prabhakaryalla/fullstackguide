# 2564. Substring XOR Queries

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Bit Manipulation

## Problem

You are given a binary string `s` and a 2D integer array `queries` where `queries[i] = [first_i, second_i]`.

For the `i`th query, find the shortest substring of `s` whose decimal value, `val`, yields `second_i` when bitwise XORed with `first_i`. In other words, `val ^ first_i == second_i`.

The answer to the `i`th query is the endpoints (0-indexed) of the substring `[left_i, right_i]` or `[-1, -1]` if no such substring exists. If there are multiple answers with the same length, choose the one with the minimum `left_i`.

### Example

```
Input: s = "101101", queries = [[0,5],[1,2]]
Output: [[0,2],[2,3]]
Explanation:
Query 0: target = 0^5 = 5 (binary 101), substring s[0:2] = "101"
Query 1: target = 1^2 = 3 (binary 11), substring s[2:3] = "11"
```

## Approach

For each query, compute `target = first XOR second`. Then find the shortest substring in `s` that represents `target` in binary.

Preprocess: Build a map from all possible binary values (as integers) to their shortest occurrence `[left, right]` in `s`. Limit the substring length to avoid overflow (30-31 bits is sufficient).

For each query, look up the target value in the map.

## C# Solution

```csharp
public class Solution
{
    public int[][] SubstringXorQueries(string s, int[][] queries)
    {
        var map = new Dictionary<int, int[]>();
        int n = s.Length;
        
        // Preprocess: map each value to its shortest occurrence
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '0')
            {
                if (!map.ContainsKey(0))
                    map[0] = new int[] { i, i };
                continue;
            }
            
            int val = 0;
            for (int j = i; j < n && j - i < 31; j++)
            {
                val = val * 2 + (s[j] - '0');
                if (!map.ContainsKey(val))
                    map[val] = new int[] { i, j };
            }
        }
        
        int[][] result = new int[queries.Length][];
        for (int i = 0; i < queries.Length; i++)
        {
            int target = queries[i][0] ^ queries[i][1];
            result[i] = map.ContainsKey(target) ? map[target] : new int[] { -1, -1 };
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n × min(n, 31) + q) for preprocessing and queries
- **Space:** O(n × min(n, 31)) for the map
