# 1537. Get the Maximum Score

**Difficulty:** Hard
**Category:** Array, Greedy, Dynamic Programming, Two Pointers

## Problem

Given two sorted arrays of distinct integers `nums1` and `nums2`, you may start on either array and, whenever you reach a value that also exists in the other array, you may switch to that array (continuing from that same value). Return the maximum sum achievable by traversing either array from start to end while following this rule, modulo `10^9 + 7`.

### Example

```
Input: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
Output: 30
```

## Approach

Use two pointers to walk both arrays simultaneously, accumulating a running sum for each array between shared "crossing" values. Whenever the pointers reach a common value, add the larger of the two accumulated running sums to the total, reset both running sums, and advance past the common value in both arrays. Whichever array has the smaller current value advances its pointer and adds to its own running sum. At the end, add the larger of the two remaining running sums (covering the tail past the last common value).

## C# Solution

```csharp
public class Solution
{
    public int MaxSum(int[] nums1, int[] nums2)
    {
        const int Mod = 1_000_000_007;
        int i = 0, j = 0;
        long sum1 = 0, sum2 = 0;
        long total = 0;

        while (i < nums1.Length && j < nums2.Length)
        {
            if (nums1[i] < nums2[j])
            {
                sum1 += nums1[i++];
            }
            else if (nums1[i] > nums2[j])
            {
                sum2 += nums2[j++];
            }
            else
            {
                total += Math.Max(sum1, sum2) + nums1[i];
                sum1 = 0;
                sum2 = 0;
                i++;
                j++;
            }
        }

        while (i < nums1.Length)
        {
            sum1 += nums1[i++];
        }

        while (j < nums2.Length)
        {
            sum2 += nums2[j++];
        }

        total += Math.Max(sum1, sum2);
        return (int)(total % Mod);
    }
}
```

## Complexity

- **Time:** `O(m + n)` — each pointer advances through its array exactly once.
- **Space:** `O(1)` extra space.
