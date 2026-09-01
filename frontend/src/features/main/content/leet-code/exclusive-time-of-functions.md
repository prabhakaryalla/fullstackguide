# 636. Exclusive Time of Functions

**Difficulty:** Medium
**Category:** Array, Stack

## Problem

Given `n` functions running on a single-threaded CPU, along with a chronological log of `"function_id:start_or_end:timestamp"` entries, return the exclusive time (time spent executing, excluding time spent in nested calls) of each function.

### Example

```
Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
Output: [3,4]
```

### Constraints

- `1 <= n <= 100`
- `1 <= logs.length <= 500`

## Approach

Use a call stack of currently-active function ids. On a `"start"` event, credit the elapsed time since the last recorded timestamp to whichever function is currently on top of the stack (it was running during that gap), then push the new function. On an `"end"` event, credit the elapsed time (inclusive of the end timestamp) to the function being popped, since it was actively running through that instant.

## C# Solution

```csharp
public class Solution
{
    public int[] ExclusiveTime(int n, IList<string> logs)
    {
        var result = new int[n];
        var stack = new Stack<int>();
        int previousTime = 0;

        foreach (var log in logs)
        {
            var parts = log.Split(':');
            int id = int.Parse(parts[0]);
            var type = parts[1];
            int timestamp = int.Parse(parts[2]);

            if (type == "start")
            {
                if (stack.Count > 0)
                    result[stack.Peek()] += timestamp - previousTime;

                stack.Push(id);
                previousTime = timestamp;
            }
            else
            {
                result[stack.Pop()] += timestamp - previousTime + 1;
                previousTime = timestamp + 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(logs.Count)`.
- **Space:** `O(n)` for the result array and stack.
