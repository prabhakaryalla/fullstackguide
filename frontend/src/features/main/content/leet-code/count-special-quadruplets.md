# 1995. Count Special Quadruplets

**Difficulty:** Easy
**Category:** Array, Enumeration

## Problem

Given an array `nums` of distinct positive integers, return the number of index quadruplets `(a, b, c, d)` with `0 <= a < b < c < d < n` such that `nums[a] + nums[b] + nums[c] == nums[d]`.

### Example

```
Input: nums = [1,2,3,6]
Output: 1
Explanation: (0,1,2,3): 1 + 2 + 3 == 6.
```

### Constraints

- `4 <= nums.length <= 50`
- `1 <= nums[i] <= 100`

## Approach

Given the very small constraint (`n <= 50`), brute-force enumerate all quadruplets `a < b < c < d` with four nested loops and count those satisfying `nums[a] + nums[b] + nums[c] == nums[d]`.

## C# Solution

```csharp
public class Solution
{
    public int CountQuadruplets(int[] nums)
    {
        int n = nums.Length;
        int count = 0;

        for (int a = 0; a < n; a++)
        {
            for (int b = a + 1; b < n; b++)
            {
                for (int c = b + 1; c < n; c++)
                {
                    for (int d = c + 1; d < n; d++)
                    {
                        if (nums[a] + nums[b] + nums[c] == nums[d])
                        {
                            count++;
                        }
                    }
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^4)` — four nested loops over indices, acceptable given `n <= 50`.
- **Space:** `O(1)`.
