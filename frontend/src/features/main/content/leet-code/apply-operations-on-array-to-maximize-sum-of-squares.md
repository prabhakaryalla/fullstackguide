# 2897. Apply Operations on Array to Maximize Sum of Squares

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Greedy, Sorting

## Problem

You are given a 0-indexed integer array `nums` and a positive integer `k`. You may perform the following operation any number of times: choose two indices `i != j` and simultaneously replace `nums[i]` with `nums[i] AND nums[j]` and `nums[j]` with `nums[i] OR nums[j]` (using the original values). Select exactly `k` elements from the final array to maximize the sum of their squares, modulo `10^9 + 7`.

### Example

`nums = [2,6,5,8]`, `k = 2` → answer `261` (after operations you can obtain values `15` and `6`, and `15^2 + 6^2 = 225 + 36 = 261`).

## Approach

For a fixed bit position, this AND/OR operation only moves that single bit between the two chosen elements — it never changes how many elements in total have that bit set. So across unlimited operations, for every bit position `b`, the total count `count[b]` of elements having that bit set is invariant, but we're free to redistribute which elements hold it.

Since squaring is convex, to maximize the sum of squares of the `k` selected elements it's best to concentrate bits into as few numbers as possible rather than spreading them out. The optimal strategy: sort the "buckets" `0..k-1`, and for each bit `b`, give that bit to bucket `i` whenever `count[b] > i` (i.e., the bit is assigned to the first `count[b]` buckets). This greedily builds the `k` largest possible numbers.

## C# Solution

```csharp
public class Solution 
{
    public int MaxSum(IList<int> nums, int k) 
    {
        const int Mod = 1_000_000_007;
        int[] bitCount = new int[30];
        foreach (int num in nums)
        {
            for (int b = 0; b < 30; b++)
            {
                if ((num & (1 << b)) != 0)
                {
                    bitCount[b]++;
                }
            }
        }

        long answer = 0;
        for (int bucket = 0; bucket < k; bucket++)
        {
            long value = 0;
            for (int b = 0; b < 30; b++)
            {
                if (bitCount[b] > bucket)
                {
                    value |= 1L << b;
                }
            }
            long v = value % Mod;
            answer = (answer + v * v) % Mod;
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** O((n + k) * 30)
- **Space:** O(1)
