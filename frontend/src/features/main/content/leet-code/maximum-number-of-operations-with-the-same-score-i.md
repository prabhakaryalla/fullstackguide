# 3038. Maximum Number of Operations With the Same Score I

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given an array `nums`. In one operation, remove the first two elements of the array and their sum is that operation's "score." Every operation performed must have the **same** score as the very first operation. Return the maximum number of operations that can be performed.

### Example

```
Input: nums = [3,2,1,4,5]
Output: 2
Explanation: First operation removes [3,2], score 5. Second operation removes [1,4], score 5 (matches).
The next pair [5] can't form an operation since only one element remains.
```

## Approach

The required score is fixed by the very first operation (`nums[0] + nums[1]`). Then simply keep removing pairs of the first two remaining elements as long as they keep summing to that same fixed score, stopping as soon as a pair doesn't match (or fewer than two elements remain).

## C# Solution

```csharp
public class Solution {
    public int MaxOperations(int[] nums) {
        int ans = 1;
        int sum = nums[0] + nums[1];

        for (int i = 2; i + 1 < nums.Length; i += 2) {
            if (nums[i] + nums[i + 1] == sum)
                ans++;
            else
                break;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass through the array in steps of two.
- Space: O(1).
