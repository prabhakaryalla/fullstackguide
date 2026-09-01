# 502. IPO

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given `w` initial capital, and arrays `profits` and `capital` where project `i` requires `capital[i]` to start and yields `profits[i]` upon completion, choose at most `k` distinct projects to maximize final capital, starting each chosen project only when enough capital is available. Return the maximum capital after finishing at most `k` projects.

### Example

```
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
```

### Constraints

- `1 <= k <= 10^5`
- `0 <= w <= 10^9`
- `n == profits.length == capital.length`
- `1 <= n <= 10^5`
- `0 <= profits[i] <= 10^4`
- `0 <= capital[i] <= 10^9`

## Approach

Sort projects by required capital ascending. Repeat `k` times: push every project whose capital requirement is now affordable (given current wealth) into a max-heap keyed by profit, then greedily complete the single most profitable affordable project, adding its profit to the current capital. Stop early if no projects are affordable.

## C# Solution

```csharp
public class Solution
{
    public int FindMaximizedCapital(int k, int w, int[] profits, int[] capital)
    {
        int n = profits.Length;
        var projects = new (int Capital, int Profit)[n];
        for (int i = 0; i < n; i++)
            projects[i] = (capital[i], profits[i]);

        Array.Sort(projects, (a, b) => a.Capital.CompareTo(b.Capital));

        var maxProfitHeap = new PriorityQueue<int, int>();
        int index = 0;

        for (int round = 0; round < k; round++)
        {
            while (index < n && projects[index].Capital <= w)
            {
                maxProfitHeap.Enqueue(projects[index].Profit, -projects[index].Profit);
                index++;
            }

            if (maxProfitHeap.Count == 0) break;

            w += maxProfitHeap.Dequeue();
        }

        return w;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
