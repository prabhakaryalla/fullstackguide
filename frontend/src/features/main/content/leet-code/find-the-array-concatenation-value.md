# 2562. Find the Array Concatenation Value

**Difficulty:** Easy
**Category:** Array, Two Pointers, Simulation

## Problem

You are given a 0-indexed integer array `nums`.

The concatenation of two numbers is the number formed by concatenating their numerals (e.g., concatenation of 12 and 34 is 1234).

The concatenation value of `nums` is initially equal to 0. Perform this operation until `nums` becomes empty:

- If there is more than one number in `nums`, pick the first and last elements, concatenate them, and add the concatenation value to the answer. Then delete the first and last elements.
- If one element exists, add its value to the answer. Then delete it.

Return the concatenation value of `nums`.

### Example

```
Input: nums = [7,52,2,4]
Output: 596
Explanation:
Concatenate 7 and 4 → 74, nums = [52,2], answer = 74
Concatenate 52 and 2 → 522, nums = [], answer = 74 + 522 = 596

Input: nums = [5,14,13,8,12]
Output: 673
Explanation:
Concatenate 5 and 12 → 512, nums = [14,13,8], answer = 512
Concatenate 14 and 8 → 148, nums = [13], answer = 512 + 148 = 660
Add 13, answer = 660 + 13 = 673
```

## Approach

Use two pointers, one at the start and one at the end of the array. While the start pointer is less than the end pointer:
- Concatenate `nums[start]` and `nums[end]` by converting to strings, concatenating, and parsing back to integer
- Add to the running sum
- Move both pointers inward

If the pointers meet (odd-length array), add the middle element to the sum.

## C# Solution

```csharp
public class Solution
{
    public long FindTheArrayConcVal(int[] nums)
    {
        long sum = 0;
        int left = 0, right = nums.Length - 1;
        
        while (left < right)
        {
            string concatenated = nums[left].ToString() + nums[right].ToString();
            sum += long.Parse(concatenated);
            left++;
            right--;
        }
        
        if (left == right)
            sum += nums[left];
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n × d) where n is the array length and d is the average number of digits
- **Space:** O(d) for string concatenation
