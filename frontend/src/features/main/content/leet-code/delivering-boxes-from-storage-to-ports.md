# 1687. Delivering Boxes from Storage to Ports

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Segment Tree, Heap (Priority Queue), Prefix Sum, Monotonic Queue

## Problem

Boxes must be delivered, in order, from storage to their respective ports (`boxes[i] = [port, weight]`). A single trip loads a contiguous run of boxes (subject to `maxBoxes` and total `maxWeight` limits), delivers them in order (visiting each distinct port along the way), and returns to storage. Return the minimum number of trips to deliver all boxes.

### Example

```
Input: boxes = [[1,1],[2,1],[1,1]], portsCount = 2, maxBoxes = 3, maxWeight = 3
Output: 3
```

## Approach

Let `dp[i]` be the minimum trips to deliver the first `i` boxes. Maintain a sliding window `[l, r]` of the boxes that could form the *last* trip ending at `r`; its cost is `2 + (number of port changes within [l, r])` (a base "there and back," plus one extra stop for every port switch). Shrink the window from the left whenever it violates `maxBoxes`/`maxWeight`, or whenever `dp[l+1] == dp[l]` (meaning including `boxes[l]` in the *previous* trip is never worse than starting the current trip with it, so the window can safely advance). Update a running `trips` counter incrementally as the window's port-change count changes, avoiding recomputation, giving an overall O(n) two-pointer DP.

## C# Solution

```csharp
public class Solution
{
    public int BoxDelivering(int[][] boxes, int portsCount, int maxBoxes, int maxWeight)
    {
        int n = boxes.Length;
        int[] dp = new int[n + 1];
        int trips = 2;
        int weight = 0;
        int l = 0;

        for (int r = 0; r < n; r++)
        {
            weight += boxes[r][1];

            if (r > 0 && boxes[r][0] != boxes[r - 1][0])
            {
                trips++;
            }

            while (r - l + 1 > maxBoxes || weight > maxWeight || (l < r && dp[l + 1] == dp[l]))
            {
                weight -= boxes[l][1];

                if (boxes[l][0] != boxes[l + 1][0])
                {
                    trips--;
                }

                l++;
            }

            dp[r + 1] = dp[l] + trips;
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n)`, since each index enters and leaves the window at most once.
- **Space:** `O(n)` for the `dp` array.
