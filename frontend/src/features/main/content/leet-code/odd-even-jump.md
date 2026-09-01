# 975. Odd Even Jump

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack, Dynamic Programming

## Problem

Given an integer array `arr`, starting at any index you alternate odd-numbered jumps (to the smallest value ahead that is `>=` current, breaking ties by the smallest index) and even-numbered jumps (to the largest value ahead that is `<=` current). Return the number of starting indices from which you can reach the last index via such a sequence of jumps.

### Example

```
Input: arr = [10,13,12,14,15]
Output: 2
```

## Approach

Precompute, for every index, the destination of an odd jump and of an even jump using a monotonic stack technique: sort indices by value (ties by index ascending, for odd jumps looking for the next-greater-or-equal) and use a decreasing index stack to assign each index its next larger index seen while iterating in sorted order; do the mirrored computation for even jumps. Then, working backward from the last index, `canOdd[i]`/`canEven[i]` are true if the corresponding jump target's opposite-parity reachability is true; count every index where `canOdd[i]` holds since the first jump is always odd.

## C# Solution

```csharp
public class Solution
{
    public int OddEvenJumps(int[] arr)
    {
        int n = arr.Length;
        var higher = NextIndex(arr, true);
        var lower = NextIndex(arr, false);

        var canOdd = new bool[n];
        var canEven = new bool[n];
        canOdd[n - 1] = canEven[n - 1] = true;
        int count = 1;

        for (int i = n - 2; i >= 0; i--)
        {
            if (higher[i] != -1) canOdd[i] = canEven[higher[i]];
            if (lower[i] != -1) canEven[i] = canOdd[lower[i]];
            if (canOdd[i]) count++;
        }

        return count;
    }

    private int[] NextIndex(int[] arr, bool findHigher)
    {
        int n = arr.Length;
        var result = new int[n];
        Array.Fill(result, -1);

        var stack = new Stack<int>();
        var order = Enumerable.Range(0, n)
            .OrderBy(i => findHigher ? arr[i] : -arr[i])
            .ThenBy(i => i)
            .ToArray();

        foreach (var i in order)
        {
            while (stack.Count > 0 && stack.Peek() < i) result[stack.Pop()] = i;
            stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
