# 2657. Find the Prefix Common Array of Two Arrays

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given two 0-indexed integer permutations `A` and `B` of length `n`. A prefix common array of `A` and `B` is an array `C` such that `C[i]` is equal to the count of numbers that are present at or before the index `i` in both `A` and `B`.

Return the prefix common array of `A` and `B`.

A sequence of `n` integers is called a permutation if it contains all integers from `1` to `n` exactly once.

### Example

```
Input: A = [1,3,2,4], B = [3,1,2,4]
Output: [0,2,3,4]
Explanation:
At i = 0: no common elements, C[0] = 0
At i = 1: 1 and 3 are common, C[1] = 2
At i = 2: 1, 2, and 3 are common, C[2] = 3
At i = 3: all are common, C[3] = 4
```

## Approach

Use two sets to track elements seen so far in `A` and `B`. For each index, add the current elements to their respective sets, then compute the intersection size.

## C# Solution

```csharp
public class Solution
{
    public int[] FindThePrefixCommonArray(int[] A, int[] B)
    {
        int n = A.Length;
        int[] result = new int[n];
        var setA = new HashSet<int>();
        var setB = new HashSet<int>();
        
        for (int i = 0; i < n; i++)
        {
            setA.Add(A[i]);
            setB.Add(B[i]);
            
            int common = 0;
            foreach (int num in setA)
            {
                if (setB.Contains(num))
                    common++;
            }
            
            result[i] = common;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n²) — checking intersection at each step
- **Space:** O(n) — for the sets
