# 3594. Minimum Time to Transport All Individuals

**Difficulty:** Hard
**Category:** Greedy, Sorting, Dynamic Programming

## Problem
A group of individuals must cross a bridge at night using a single flashlight. Each individual `i` takes `times[i]` minutes to cross alone. At most two people may cross the bridge at a time, and whenever a pair crosses, they move at the slower person's pace. Since the flashlight must be carried back and forth, someone who has already crossed must return it before another pair can cross. Return the minimum total time required to get every individual across.

## Approach
This is the classic "bridge and torch" puzzle. Sort `times` ascending. While more than three people remain on the starting side, repeatedly compare two strategies for moving the two slowest people across:

1. The two fastest people (`t[0]`, `t[1]`) send `t[1]` back and forth to ferry the two slowest people one at a time: cost `t[0] + 2*t[1] + t[end]`.
2. The fastest person ferries the two slowest together, with the second-fastest bridging: cost `2*t[0] + t[end-1] + t[end]`.

Take the cheaper option each round and remove the two slowest people from consideration. Once three or fewer people remain, handle the base case directly (send them together, or one/two at a time).

## C# Solution

```csharp
public class Solution 
{
    public long MinTimeToTransport(int[] times)
    {
        var t = (int[])times.Clone();
        Array.Sort(t);
        int n = t.Length;
        long total = 0;
        int end = n - 1;

        while (end > 2)
        {
            long option1 = t[0] + 2L * t[1] + t[end];
            long option2 = 2L * t[0] + t[end - 1] + t[end];
            total += Math.Min(option1, option2);
            end -= 2;
        }

        if (end == 2) total += t[0] + t[1] + t[2];
        else if (end == 1) total += t[1];
        else if (end == 0) total += t[0];

        return total;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, O(n) for the greedy simulation.
- **Space:** O(n) for the sorted copy.
