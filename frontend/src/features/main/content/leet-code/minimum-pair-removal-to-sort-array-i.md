# 3507. Minimum Pair Removal to Sort Array I

**Difficulty:** Easy
**Category:** Array, Simulation, Heap (Priority Queue)

## Problem

You are given an integer array `nums`. In one operation you must find an adjacent pair of elements with the **minimum** sum (choosing the leftmost such pair if there is a tie), and replace both elements with a single element equal to their sum (shrinking the array by one). Return the minimum number of operations needed so that `nums` becomes non-decreasing.

### Example

```
Input: nums = [5,2,3,1]
Output: 2
Explanation:
- Adjacent sums: (5+2)=7, (2+3)=5, (3+1)=4. The minimum is (3,1) at index 2; merge -> [5,2,4]. Not sorted (5 > 2).
- Adjacent sums: (5+2)=7, (2+4)=6. The minimum is (2,4) at index 1; merge -> [5,6]. Now sorted (5 <= 6).
It took 2 operations to reach a non-decreasing array.
```

## Approach

Because this is the small-constraint ("I") version, a straightforward simulation is sufficient: repeatedly scan the (shrinking) list of remaining values for the adjacent pair with the minimum sum (leftmost wins ties), merge it into a single value, and check whether the array is currently non-decreasing. Stop as soon as it is, returning the number of merges performed.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumPairRemoval(int[] nums) 
    {
        var list = new List<long>();
        foreach (int v in nums) list.Add(v);

        int operations = 0;
        while (!IsSorted(list))
        {
            int bestIndex = 0;
            long bestSum = list[0] + list[1];
            for (int i = 1; i + 1 < list.Count; i++)
            {
                long sum = list[i] + list[i + 1];
                if (sum < bestSum)
                {
                    bestSum = sum;
                    bestIndex = i;
                }
            }
            list[bestIndex] = bestSum;
            list.RemoveAt(bestIndex + 1);
            operations++;
        }
        return operations;
    }

    private bool IsSorted(List<long> list)
    {
        for (int i = 1; i < list.Count; i++)
        {
            if (list[i] < list[i - 1]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n^3) in the worst case (up to n merges, each scanning up to n elements and re-checking sortedness), acceptable for the small constraints of the "I" version.
- **Space:** O(n) for the working list.
