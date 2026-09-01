# 3717. Minimum Operations to Make the Array Beautiful

**Difficulty:** Medium
**Category:** Array, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

An array is "beautiful" if every two adjacent elements have different parity (one odd, one even). In one operation you may increment or decrement any element by 1 (this flips its parity). Return the minimum number of operations needed to make the array beautiful.

### Example

nums = [2,4,5,6] → target pattern even,odd,even,odd needs 3 flips (positions 1,2,3); pattern odd,even,odd,even needs only 1 flip (position 0). Answer = 1.

## Approach

There are only two possible target parity patterns: starting with even at index 0, or starting with odd. For each pattern, count how many elements already mismatch the required parity — each mismatch costs exactly one operation. The answer is the smaller of the two counts.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums) 
    {
        int mismatchStartEven = 0, mismatchStartOdd = 0;
        for (int i = 0; i < nums.Length; i++) 
        {
            int parity = nums[i] % 2;
            int expectedIfStartEven = i % 2;
            if (parity != expectedIfStartEven) mismatchStartEven++;
            else mismatchStartOdd++;
        }
        return Math.Min(mismatchStartEven, mismatchStartOdd);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
