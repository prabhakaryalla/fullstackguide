# 3476. Maximize Profit from Task Assignment

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue), Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `workers`, where `workers[i]` is the skill level of the `i`-th worker, and a 2D array `tasks` where `tasks[j] = [skill_j, profit_j]`.

A worker can be assigned to a task only if the task's required skill exactly matches the worker's skill; each worker and each task can be used at most once. After all skill-matched assignments are made, you are additionally allowed **one bonus assignment**: you may pick any single remaining (unassigned) task, regardless of skill, and add its profit to your total, representing training one otherwise-idle worker to complete it.

Return the maximum total profit achievable.

### Example
Input: `workers = [1, 2]`, `tasks = [[1, 5], [1, 3], [2, 10]]`
Output: `18`
Explanation: Worker with skill 1 takes the best skill-1 task (profit 5), worker with skill 2 takes the skill-2 task (profit 10), for 15. The remaining task (skill 1, profit 3) is used as the one bonus assignment, adding 3, for a total of 18.

## Approach
Group tasks by skill and sort each group's profits in descending order. For every worker, if their skill has any remaining task, assign the highest-profit remaining task of that skill and add it to the total. Once all workers are assigned, scan every skill group for the highest-profit task still remaining anywhere and add it once as the bonus assignment.

## C# Solution

```csharp
public class Solution {
    public long MaxProfit(int[] workers, int[][] tasks) {
        var skillToProfits = new Dictionary<int, List<int>>();
        foreach (var task in tasks) {
            int skill = task[0], profit = task[1];
            if (!skillToProfits.TryGetValue(skill, out var list)) {
                list = new List<int>();
                skillToProfits[skill] = list;
            }
            list.Add(profit);
        }
        foreach (var list in skillToProfits.Values)
            list.Sort((a, b) => b - a);

        long totalProfit = 0;
        foreach (int workerSkill in workers) {
            if (skillToProfits.TryGetValue(workerSkill, out var list) && list.Count > 0) {
                totalProfit += list[0];
                list.RemoveAt(0);
            }
        }

        int maxRemainingProfit = 0;
        foreach (var list in skillToProfits.Values)
            if (list.Count > 0)
                maxRemainingProfit = Math.Max(maxRemainingProfit, list[0]);

        return totalProfit + maxRemainingProfit;
    }
}
```

## Complexity

- **Time:** O(t log t + w), where t is the number of tasks and w is the number of workers
- **Space:** O(t)
