# 3185. Count Pairs That Form a Complete Day II

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem
This is the larger-constraints version of "Count Pairs That Form a Complete Day I": given an array of integers `hours` representing hours worked, count the number of pairs `(i, j)` with `i < j` such that `hours[i] + hours[j]` is a multiple of 24, now for a much larger input size.

## Approach
The identical remainder-counting technique from the smaller-constraints version scales fine here because it already runs in linear time. Maintain a frequency array of size 24 tracking how many previously seen hour values fall into each remainder class mod 24. For each new value, look up the complementary remainder count (`(24 - remainder) % 24`) and add it to the running total, then update the frequency array.

## C# Solution
```csharp
public class Solution {
    public long CountCompleteDayPairs(int[] hours) {
        long ans = 0;
        int[] count = new int[24];

        foreach (int hour in hours) {
            int rem = hour % 24;
            ans += count[(24 - rem) % 24];
            count[rem]++;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1), bounded by 24 possible remainders
