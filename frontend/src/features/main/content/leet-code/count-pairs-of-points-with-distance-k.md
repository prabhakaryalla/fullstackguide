# 2857. Count Pairs of Points With Distance k

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given a 2D integer array `coordinates` where `coordinates[i] = [xi, yi]` represent the coordinates of the `i`th point on a 2D plane. You are also given an integer `k`.

We define the distance between two points `(x1, y1)` and `(x2, y2)` as `(x1 XOR x2) + (y1 XOR y2)` where XOR is the bitwise XOR operation.

Return the number of pairs `(i, j)` such that `i < j` and the distance between points `i` and `j` is equal to `k`.

### Example

```
Input: coordinates = [[1,2],[4,2],[1,3],[5,2]], k = 5
Output: 2
Explanation:
The pairs with distance 5 are:
- (0, 1): (1 XOR 4) + (2 XOR 2) = 5 + 0 = 5
- (0, 3): (1 XOR 5) + (2 XOR 2) = 4 + 0 = 4 (not 5)
- (1, 2): (4 XOR 1) + (2 XOR 3) = 5 + 1 = 6 (not 5)
- (2, 3): (1 XOR 5) + (3 XOR 2) = 4 + 1 = 5
Result: 2 pairs
```

## Approach

For each point `(x, y)`, we need to find how many previous points have distance `k` from it. Since the distance is `(x1 XOR x) + (y1 XOR y) = k`, we need `x1 XOR x = a` and `y1 XOR y = b` where `a + b = k`.

For each value `a` from 0 to `k`, compute `b = k - a`. Then `x1 = x XOR a` and `y1 = y XOR b`. Use a hash map to store counts of previously seen coordinate pairs and check if `(x1, y1)` exists.

## C# Solution

```csharp
public class Solution
{
    public int CountPairs(int[][] coordinates, int k)
    {
        var map = new Dictionary<(int, int), int>();
        int count = 0;
        
        foreach (var coord in coordinates)
        {
            int x = coord[0], y = coord[1];
            
            for (int a = 0; a <= k; a++)
            {
                int b = k - a;
                int x1 = x ^ a;
                int y1 = y ^ b;
                
                if (map.ContainsKey((x1, y1)))
                    count += map[(x1, y1)];
            }
            
            var key = (x, y);
            map[key] = map.GetValueOrDefault(key, 0) + 1;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** `O(n * k)` where `n` is the number of coordinates.
- **Space:** `O(n)` for the hash map.
