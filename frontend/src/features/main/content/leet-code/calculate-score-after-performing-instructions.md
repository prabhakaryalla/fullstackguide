# 3522. Calculate Score After Performing Instructions

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation, String

## Problem
You are given two arrays of equal length: `instructions` (each element is either `"add"` or `"jump"`) and `values`. Starting at `i = 0` with `score = 0`, repeatedly execute:
- If `i` is out of bounds, or instruction `i` has already been executed before, stop.
- Mark instruction `i` as executed.
- If `instructions[i] == "add"`: add `values[i]` to `score`, then move to `i + 1`.
- If `instructions[i] == "jump"`: move to `i + values[i]` (score unchanged).

Return the final `score`.

### Example
Input: `instructions = ["jump","add","add"]`, `values = [2,1,1]` → Start at `i=0` (`jump` to `i=2`), execute `i=2` (`add`, score becomes `1`), move to `i=3` which is out of bounds. Output: `1`.

## Approach
Directly simulate the execution using a `seen` boolean array (sized to the instruction list) to detect when an instruction index would be revisited (which would otherwise create an infinite loop) or when `i` moves outside the valid range. Accumulate `score` for every executed `"add"` instruction, and follow `"jump"` instructions by adjusting the current index. Stop as soon as the current index is invalid or already visited.

## C# Solution

```csharp
public class Solution {
    public long CalculateScore(string[] instructions, int[] values) {
        int n = instructions.Length;
        long ans = 0;
        int i = 0;
        var seen = new bool[n];

        while (i >= 0 && i < n && !seen[i]) {
            seen[i] = true;
            if (instructions[i] == "add") {
                ans += values[i];
                i++;
            } else { // "jump"
                i += values[i];
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n) since each instruction index is visited at most once
- **Space:** O(n) for the visited-tracking array
