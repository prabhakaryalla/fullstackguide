# 2590. Design a Todo List

**Difficulty:** Medium
**Category:** Hash Table, Design, String

## Problem

Design a Todo List where users can add tasks, mark them as complete, and get all tasks. Implement the `TodoList` class:

- `TodoList()` Initializes the object
- `int addTask(int userId, String taskDescription, int dueDate, List<String> tags)` Adds a task for the user and returns its unique ID
- `List<String> getAllTasks(int userId)` Returns a list of all tasks for the user (not removed) sorted by due date
- `List<String> getTasksForTag(int userId, String tag)` Returns tasks with the specific tag sorted by due date  
- `void completeTask(int userId, int taskId)` Marks the task as completed only if it exists and is not completed

### Example

```
TodoList todoList = new TodoList();
todoList.addTask(1, "Task1", 50, []);
todoList.addTask(1, "Task2", 100, ["P1"]);
todoList.getAllTasks(1); // ["Task1", "Task2"]
todoList.completeTask(1, 1);
todoList.getAllTasks(1); // ["Task2"]
```

## Approach

Store tasks in a data structure indexed by userId. Each task contains its ID, description, due date, tags, and completion status. For retrieval operations, filter by user and any additional criteria (tag, completion), then sort by due date.

## C# Solution

```csharp
public class TodoList
{
    private class Task
    {
        public int Id;
        public string Description;
        public int DueDate;
        public HashSet<string> Tags;
        public bool IsCompleted;
    }
    
    private int nextId = 1;
    private Dictionary<int, List<Task>> userTasks = new Dictionary<int, List<Task>>();
    
    public TodoList()
    {
    }
    
    public int AddTask(int userId, string taskDescription, int dueDate, IList<string> tags)
    {
        if (!userTasks.ContainsKey(userId))
        {
            userTasks[userId] = new List<Task>();
        }
        
        var task = new Task
        {
            Id = nextId++,
            Description = taskDescription,
            DueDate = dueDate,
            Tags = new HashSet<string>(tags),
            IsCompleted = false
        };
        
        userTasks[userId].Add(task);
        return task.Id;
    }
    
    public IList<string> GetAllTasks(int userId)
    {
        if (!userTasks.ContainsKey(userId)) return new List<string>();
        
        return userTasks[userId]
            .Where(t => !t.IsCompleted)
            .OrderBy(t => t.DueDate)
            .Select(t => t.Description)
            .ToList();
    }
    
    public IList<string> GetTasksForTag(int userId, string tag)
    {
        if (!userTasks.ContainsKey(userId)) return new List<string>();
        
        return userTasks[userId]
            .Where(t => !t.IsCompleted && t.Tags.Contains(tag))
            .OrderBy(t => t.DueDate)
            .Select(t => t.Description)
            .ToList();
    }
    
    public void CompleteTask(int userId, int taskId)
    {
        if (!userTasks.ContainsKey(userId)) return;
        
        var task = userTasks[userId].FirstOrDefault(t => t.Id == taskId);
        if (task != null && !task.IsCompleted)
        {
            task.IsCompleted = true;
        }
    }
}
```

## Complexity

- **AddTask:** O(1)
- **GetAllTasks:** O(n log n) where n is the number of tasks for the user
- **GetTasksForTag:** O(n log n)
- **CompleteTask:** O(n)
- **Space:** O(total tasks)
