# 1675. Minimize Deviation in Array

**Difficulty:** Hard
**Category:** Array, Greedy, Heap (Priority Queue), Ordered Set

## Problem

Given `nums`, you may repeatedly either double any even element's value is halved... more precisely: any even number may be divided by 2, and any odd number may be multiplied by 2 — apply any number of these operations to any elements, any number of times. Return the minimum possible difference between the maximum and minimum values in the array.

### Example

```
Input: nums = [1,2,3,4]
Output: 1
```

## Approach

Since an odd number can only ever be doubled once before becoming even (after which halving reverses it), first double every odd number up front — this captures its full achievable range. Put all values into a max-heap and track the running minimum. Repeatedly pop the maximum, record the current deviation, and if the popped value is even, halve it and push it back (potentially lowering the max and the min); stop as soon as the popped maximum is odd, since it can no longer be reduced.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDeviation(int[] nums)
    {
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        int minValue = int.MaxValue;

        foreach (int num in nums)
        {
            int value = num % 2 == 1 ? num * 2 : num;
            maxHeap.Enqueue(value, value);
            minValue = Math.Min(minValue, value);
        }

        int minDeviation = int.MaxValue;

        while (true)
        {
            maxHeap.TryPeek(out _, out int maxValue);
            maxHeap.Dequeue();
            minDeviation = Math.Min(minDeviation, maxValue - minValue);

            if (maxValue % 2 == 1)
            {
                break;
            }

            int halved = maxValue / 2;
            minValue = Math.Min(minValue, halved);
            maxHeap.Enqueue(halved, halved);
        }

        return minDeviation;
    }
}
```

## Complexity

- **Time:** `O(n log n log(max(nums)))`.
- **Space:** `O(n)` for the heap.
