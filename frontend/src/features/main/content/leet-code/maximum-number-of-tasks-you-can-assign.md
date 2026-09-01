# 2071. Maximum Number of Tasks You Can Assign

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Sorting, Ordered Set

## Problem

You have `n` tasks and `m` workers, each with a strength requirement/rating given by `tasks` and `workers`. A worker can complete a task only if their strength is `>= ` the task's requirement. You also have `pills` magic pills, each of which permanently increases exactly one worker's strength by `strength` (used at most once per worker), and at most `pills` pills total may be used. Return *the maximum number of tasks that can be completed*.

## Approach

Binary search on the answer `k` (the number of tasks assignable). Feasibility of a given `k` is monotonic: if `k` tasks can be assigned, so can any smaller number, using a subset of the same assignment.

To check feasibility of `k`: take the `k` **weakest** tasks and the `k` **strongest** workers (both make intuitive sense — using stronger workers or dropping harder tasks only helps). Process the chosen tasks from **hardest to easiest**, maintaining the chosen workers in a sorted multiset:
- If the strongest available worker can do the current task without a pill, assign them (removing the strongest worker preserves weaker ones for potentially easier future tasks, and avoids wasting a pill).
- Otherwise, if a pill remains, find the **weakest** available worker who could still do the task **with** a pill boost (i.e., `workerStrength + strength >= task`); if one exists, use a pill on them; otherwise the task can't be completed and `k` is infeasible.

If every task is successfully assigned, `k` is feasible.

## C# Solution

```csharp
public class Solution
{
    public int MaxTaskAssign(int[] tasks, int[] workers, int pills, int strength)
    {
        Array.Sort(tasks);
        Array.Sort(workers);

        int n = tasks.Length, m = workers.Length;
        int lo = 0, hi = Math.Min(n, m);

        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (CanAssign(tasks, workers, pills, strength, mid))
                lo = mid;
            else
                hi = mid - 1;
        }

        return lo;
    }

    private bool CanAssign(int[] tasks, int[] workers, int pills, int strength, int k)
    {
        int m = workers.Length;
        var pool = new SortedSet<(int str, int idx)>();
        for (int i = m - k; i < m; i++)
            pool.Add((workers[i], i));

        int pillsLeft = pills;

        for (int t = k - 1; t >= 0; t--)
        {
            int task = tasks[t];
            var strongest = pool.Max;

            if (strongest.str >= task)
            {
                pool.Remove(strongest);
                continue;
            }

            if (pillsLeft == 0) return false;

            var view = pool.GetViewBetween((task - strength, int.MinValue), (int.MaxValue, int.MaxValue));
            if (view.Count == 0) return false;

            var chosen = view.Min;
            pool.Remove(chosen);
            pillsLeft--;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(min(n, m) log(min(n, m)) * log(min(n, m)))` for the binary search over `k`, each with an `O(k log k)` feasibility check.
- **Space:** `O(k)` for the worker pool per feasibility check.
