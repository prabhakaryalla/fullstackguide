# 1144. Decrease Elements To Make Array Zigzag

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given an integer array `nums`, in one move you may decrease any element by `1`. Return the minimum number of moves needed to make the array "zigzag": either every even-indexed element is strictly smaller than both its neighbors, or every odd-indexed element is strictly smaller than both its neighbors.

### Example

```
Input: nums = [1,2,3]
Output: 2
```

## Approach

Try both target patterns independently — making even-indexed elements the "valleys" and making odd-indexed elements the "valleys". For a chosen parity, every element at that parity that is not already smaller than both neighbors must be decreased down to one less than its smaller neighbor; sum those decrements for each pattern and return the cheaper of the two.

## C# Solution

```csharp
public class Solution
{
    public int MovesToMakeZigzag(int[] nums)
    {
        int n = nums.Length;
        int[] cost = new int[2];

        for (int parity = 0; parity < 2; parity++)
        {
            int decrements = 0;

            for (int i = parity; i < n; i += 2)
            {
                int left = i > 0 ? nums[i - 1] : int.MaxValue;
                int right = i < n - 1 ? nums[i + 1] : int.MaxValue;
                int minNeighbor = Math.Min(left, right);

                if (nums[i] >= minNeighbor)
                {
                    decrements += nums[i] - minNeighbor + 1;
                }
            }

            cost[parity] = decrements;
        }

        return Math.Min(cost[0], cost[1]);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
