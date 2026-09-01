# 3168. Minimum Number of Chairs in a Waiting Room

**Difficulty:** Easy
**Category:** String, Simulation

## Problem
You are given a string `s` where each character represents an event over time: `'E'` means a person enters the waiting room, and `'L'` means a person leaves the waiting room. Assuming the room starts empty, determine the minimum number of chairs needed so that every person who enters always has a chair available.

## Approach
Simulate the sequence of events while tracking the current number of occupied chairs. Each `'E'` increases the occupied count by 1, each `'L'` decreases it by 1. Track the maximum occupied count observed at any point during the simulation; that maximum is the minimum number of chairs required.

## C# Solution
```csharp
public class Solution {
    public int MinimumChairs(string s) {
        int ans = 0;
        int chairs = 0;

        foreach (char c in s) {
            chairs += c == 'E' ? 1 : -1;
            ans = Math.Max(ans, chairs);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
