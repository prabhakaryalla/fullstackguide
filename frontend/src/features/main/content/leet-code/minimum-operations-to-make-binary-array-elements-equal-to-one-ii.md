# 3192. Minimum Operations to Make Binary Array Elements Equal to One II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Dynamic Programming, Greedy

## Problem
Given a binary array `nums`, in one operation you may choose any single index and flip that element along with every element after it (from that index to the end of the array). Return the minimum number of operations to make every element in the array equal to 1.

## Approach
Process the array from left to right while tracking the "effective value" of the current target we're trying to match (starting with a desired value of 1, since flipping the suffix starting at position 0 could apply). Actually, track the number of suffix-flips applied so far via parity: if the current element (after accounting for however many suffix flips have been applied up to this point) does not match the currently expected target bit, we must perform a suffix-flip operation starting here, which toggles the expected target bit for all subsequent positions. Count how many times this mismatch occurs.

## C# Solution
```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int ans = 0;
        int target = 1;

        foreach (int num in nums) {
            if (num != target) {
                target ^= 1;
                ans++;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
