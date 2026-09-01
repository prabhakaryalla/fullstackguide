# 3184. Count Pairs That Form a Complete Day I

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem
Given an array of integers `hours` representing hours worked by different employees, count the number of pairs `(i, j)` with `i < j` such that `hours[i] + hours[j]` is a multiple of 24 (representing a "complete day" or set of complete days).

## Approach
Track a frequency count of each possible remainder when dividing by 24 (values 0 through 23), processed as we scan through the array. For each new hour value, compute its remainder mod 24, then look up how many previously seen values have the complementary remainder (`(24 - remainder) % 24`) that would sum to a multiple of 24; add that count to the answer. Then increment the current remainder's frequency count before moving to the next element.

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
