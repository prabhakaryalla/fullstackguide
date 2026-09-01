# 3408. Design Task Manager

**Difficulty:** Medium
**Category:** Design, Ordered Set, Hash Table

## Problem

Design a task manager that performs the following operations:

- `TaskManager(List<List<int>> tasks)`: Initializes the manager with a list of `[userId, taskId, priority]` triples.
- `Add(int userId, int taskId, int priority)`: Adds a new task for the given user.
- `Edit(int taskId, int newPriority)`: Updates the priority of an existing task.
- `Rmv(int taskId)`: Removes a task from the manager.
- `ExecTop()`: Executes and removes the task with the **highest priority**, breaking ties by the **largest `taskId`**. Returns the `userId` of the executed task, or `-1` if there are no tasks.

### Example

```
TaskManager([[1,101,10],[2,102,20]])
Add(3, 103, 15)
ExecTop() -> 2   // task 102 has the highest priority (20)
ExecTop() -> 3   // task 103 has priority 15, higher than task 101's 10
```

## Approach

Maintain a `SortedSet<(priority, taskId, userId)>` so the highest-priority task (with ties broken by largest `taskId`) is always available via `Max`. A separate dictionary maps `taskId` → `(userId, priority)` so `Edit` and `Rmv` can locate and remove the correct tuple from the sorted set before re-inserting an updated one.

## C# Solution

```csharp
public class TaskManager 
{
    private readonly Dictionary<int, (int userId, int priority)> taskInfo = new Dictionary<int, (int userId, int priority)>();
    private readonly SortedSet<(int priority, int taskId, int userId)> tasksByPriority =
        new SortedSet<(int priority, int taskId, int userId)>();

    public TaskManager(IList<IList<int>> tasks) 
    {
        foreach (var task in tasks) 
        {
            int userId = task[0], taskId = task[1], priority = task[2];
            taskInfo[taskId] = (userId, priority);
            tasksByPriority.Add((priority, taskId, userId));
        }
    }

    public void Add(int userId, int taskId, int priority) 
    {
        taskInfo[taskId] = (userId, priority);
        tasksByPriority.Add((priority, taskId, userId));
    }

    public void Edit(int taskId, int newPriority) 
    {
        var (userId, oldPriority) = taskInfo[taskId];
        tasksByPriority.Remove((oldPriority, taskId, userId));
        taskInfo[taskId] = (userId, newPriority);
        tasksByPriority.Add((newPriority, taskId, userId));
    }

    public void Rmv(int taskId) 
    {
        var (userId, priority) = taskInfo[taskId];
        tasksByPriority.Remove((priority, taskId, userId));
        taskInfo.Remove(taskId);
    }

    public int ExecTop() 
    {
        if (tasksByPriority.Count == 0) 
        {
            return -1;
        }
        var top = tasksByPriority.Max;
        tasksByPriority.Remove(top);
        taskInfo.Remove(top.taskId);
        return top.userId;
    }
}
```

## Complexity

- **Time:** O(log n) per operation
- **Space:** O(n)
