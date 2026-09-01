# 3542. Minimum Operations to Convert All Elements to Zero

**Difficulty:** Medium
**Category:** Array, Hash Table, Stack, Monotonic Stack, Greedy

## Problem
You are given an integer array `nums`. In one operation, you may select any subarray of `nums` and set every element within that subarray that equals the **minimum value of the subarray** to `0`. Return the minimum number of operations required to make every element of `nums` equal to `0`.

### Example
Input: `nums = [1,2,1,3]` → Selecting the whole array (min = 1) zeroes both `1`s in one operation, leaving `[0,2,0,3]`. Selecting `[2]` alone zeroes it, then `[3]` alone zeroes it: total `3` operations. Output: `3`.

## Approach
Each operation can target one contiguous span and zero out all copies of that span's minimum at once, so the minimum number of operations equals the number of **distinct "value layers"** that appear when scanning the array while ignoring values that get dominated by a later, strictly-larger value forming its own new layer.

Maintain a monotonic non-decreasing stack (seeded with a sentinel `0`). For each element `num`:
- Pop any stack values greater than `num` (they're superseded — they belonged to a layer that's no longer the "current" boundary).
- If the stack is now empty or its top is strictly less than `num`, this `num` starts a genuinely new layer: push it and increment the operation count.
- Otherwise (`top == num`), it belongs to an already-counted layer; do nothing.

The final operation count equals the number of new layers encountered.

## C# Solution

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int ans = 0;
        var stack = new Stack<int>();
        stack.Push(0);

        foreach (int num in nums) {
            while (stack.Count > 0 && stack.Peek() > num) stack.Pop();
            if (stack.Count == 0 || stack.Peek() < num) {
                ans++;
                stack.Push(num);
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n) since each element is pushed and popped at most once
- **Space:** O(n) for the monotonic stack in the worst case
