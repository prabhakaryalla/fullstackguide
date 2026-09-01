# 3369. Design an Array Statistics Tracker

**Difficulty:** Medium
**Category:** Design, Data Stream, Heap (Priority Queue)
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Design a data structure that supports adding numbers one at a time and, at any point, reports statistics about the numbers added so far:

- `Add(int number)`: adds `number` to the tracked collection.
- `GetMedian()`: returns the median of all numbers added so far.
- `GetMode()`: returns the value that has appeared the most times so far (any one of them if there is a tie).

## Approach
Maintain a sorted list of all added numbers (inserting each new value at its correct position with binary search) so the median can be read directly from the middle position(s) in O(1) after insertion. Separately maintain a frequency map and track the current mode incrementally: whenever a value's frequency increases past the current highest frequency, update the tracked mode.

## C# Solution

```csharp
public class ArrayStatisticsTracker 
{
    private readonly List<int> sorted = new List<int>();
    private readonly Dictionary<int, int> frequency = new Dictionary<int, int>();
    private int modeValue = 0;
    private int modeCount = 0;

    public void Add(int number) 
    {
        int idx = sorted.BinarySearch(number);
        if (idx < 0) idx = ~idx;
        sorted.Insert(idx, number);

        int newFreq = frequency.GetValueOrDefault(number) + 1;
        frequency[number] = newFreq;
        if (newFreq > modeCount) 
        {
            modeCount = newFreq;
            modeValue = number;
        }
    }

    public double GetMedian() 
    {
        int n = sorted.Count;
        if (n % 2 == 1) return sorted[n / 2];
        return (sorted[n / 2 - 1] + sorted[n / 2]) / 2.0;
    }

    public int GetMode() 
    {
        return modeValue;
    }
}
```

## Complexity

- **Time:** O(n) per `Add` call (due to list insertion shifting elements); O(1) for `GetMedian` and `GetMode`.
- **Space:** O(n)
