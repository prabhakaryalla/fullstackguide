# 3074. Apple Redistribution into Boxes

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

You are given an array `apple` where `apple[i]` is the number of apples in the `i`-th pack, and an array `capacity` where `capacity[j]` is how many apples the `j`-th box can hold. The total apple count never exceeds the total box capacity. Return the minimum number of boxes needed to store all the apples.

### Example

```
Input: apple = [1,3,2], capacity = [4,3,1,5,2]
Output: 2
Explanation: The two largest boxes (5 and 4) can already hold 9 >= 6 apples.
```

## Approach

To minimize the number of boxes used, greedily use the largest-capacity boxes first. Sort `capacity` descending, and keep adding boxes (accumulating their capacity) until the running total reaches or exceeds the total apple count.

## C# Solution

```csharp
public class Solution {
    public int MinimumBoxes(int[] apple, int[] capacity) {
        int appleSum = apple.Sum();
        Array.Sort(capacity);
        Array.Reverse(capacity);

        int capacitySum = 0;
        for (int i = 0; i < capacity.Length; i++) {
            capacitySum += capacity[i];
            if (capacitySum >= appleSum)
                return i + 1;
        }

        return capacity.Length;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting the capacities.
- Space: O(1) — beyond the input arrays.
