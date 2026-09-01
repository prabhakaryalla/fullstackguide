# 346. Moving Average from Data Stream

**Difficulty:** Easy
**Category:** Array, Design, Queue
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window. Implement the `MovingAverage` class with a constructor taking the window `size`, and a `Next(val)` method that appends a new value and returns the current moving average.

### Example

```
Input:
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
Output:
[null, 1.0, 5.5, 4.66667, 6.0]
```

### Constraints

- `1 <= size <= 1000`
- `-10^5 <= val <= 10^5`
- At most `10^4` calls will be made to `Next`.

## Approach

Maintain a queue holding exactly the values currently in the window, along with a running sum. Each call enqueues the new value and adds it to the sum; once the queue exceeds the target size, dequeue and subtract the oldest value. The moving average is simply the running sum divided by the current queue length.

## C# Solution

```csharp
public class MovingAverage
{
    private readonly Queue<int> window = new();
    private readonly int size;
    private int sum;

    public MovingAverage(int size)
    {
        this.size = size;
    }

    public double Next(int val)
    {
        window.Enqueue(val);
        sum += val;

        if (window.Count > size)
            sum -= window.Dequeue();

        return (double)sum / window.Count;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Next` call.
- **Space:** `O(size)` for the window.
