# 2551. Put Marbles in Bags

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

You have `k` bags. You are given a 0-indexed integer array `weights` where `weights[i]` is the weight of the `i`th marble. You must put all the marbles into the bags, such that:

- Each bag has at least one marble
- No bag is empty

The score of a distribution is the sum of the scores of all bags, where the score of a bag is the weight of its first marble plus the weight of its last marble.

Return the difference between the maximum and minimum scores among all valid distributions.

### Example

```
Input: weights = [1,3,5,1], k = 2
Output: 4
Explanation:
Max distribution: [1] and [3,5,1], score = (1+1)+(3+1) = 6
Min distribution: [1,3] and [5,1], score = (1+3)+(5+1) = 10
Difference = 10 - 6 = 4
Actually, let me recalculate...
[1,3,5,1] split into k=2 bags
Max: [1,3,5] [1], score = (1+5)+(1+1) = 8
Min: [1] [3,5,1], score = (1+1)+(3+1) = 6
Difference = 8 - 6 = 2

Wait, I need to understand this better. Let me think about it as choosing k-1 split points.
```

## Approach

Think of it as choosing `k-1` split points to partition the array into `k` parts.

The score of a partition is the sum of (first + last) for each part.
This equals: `weights[0] + weights[n-1] + 2 * (sum of weights at split points)`.

To maximize: Choose the `k-1` largest adjacent pair sums
To minimize: Choose the `k-1` smallest adjacent pair sums

Compute all adjacent pair sums, sort them, and find the difference.

## C# Solution

```csharp
public class Solution
{
    public long PutMarbles(int[] weights, int k)
    {
        if (k == 1 || k == weights.Length)
            return 0;
        
        int n = weights.Length;
        int[] pairSums = new int[n - 1];
        
        for (int i = 0; i < n - 1; i++)
        {
            pairSums[i] = weights[i] + weights[i + 1];
        }
        
        Array.Sort(pairSums);
        
        long max = 0, min = 0;
        for (int i = 0; i < k - 1; i++)
        {
            min += pairSums[i];
            max += pairSums[n - 2 - i];
        }
        
        return max - min;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the pair sums array
