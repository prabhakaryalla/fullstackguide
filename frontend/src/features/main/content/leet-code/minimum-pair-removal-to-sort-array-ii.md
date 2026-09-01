# 3510. Minimum Pair Removal to Sort Array II

**Difficulty:** Hard
**Category:** Array, Hash Table, Linked List, Heap (Priority Queue), Simulation, Ordered Set

## Problem
Given an array `nums`, you may perform the following operation any number of times: select the adjacent pair with the minimum sum (the leftmost such pair if there is a tie), and replace the pair with their sum (merging the two elements into one, shrinking the array by 1). Return the minimum number of operations needed to make the array non-decreasing.

### Example
Input: `nums = [5, 2, 3, 1]`
Output: `2`
Explanation: The pair `(3, 1)` has the minimum sum, 4; replacing it gives `[5, 2, 4]`. Then the pair `(2, 4)` has the minimum sum, 6; replacing it gives `[5, 6]`, which is non-decreasing. Two operations were used.

## Approach
Directly simulate the process: while the array is not non-decreasing, scan all adjacent pairs to find the one with the minimum sum (breaking ties by leftmost position), merge it into a single element equal to their sum, and count the operation. Repeat until the array becomes non-decreasing.

## C# Solution

```csharp
public class Solution {
    public int MinimumPairRemoval(int[] nums) {
        List<long> list = new List<long>();
        foreach (int num in nums) list.Add(num);

        int operations = 0;
        while (!IsNonDecreasing(list)) {
            int bestIndex = 0;
            long bestSum = list[0] + list[1];
            for (int i = 1; i + 1 < list.Count; i++) {
                long sum = list[i] + list[i + 1];
                if (sum < bestSum) {
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

    private bool IsNonDecreasing(List<long> list) {
        for (int i = 1; i < list.Count; i++)
            if (list[i] < list[i - 1]) return false;
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2) for this direct simulation, where n is the array length (an optimized solution maintains a doubly-linked structure with an ordered set of adjacent-pair sums plus an inversion counter to achieve O(n log n))
- **Space:** O(n)
