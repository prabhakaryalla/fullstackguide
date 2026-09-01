# 3483. Unique 3-Digit Even Numbers

**Difficulty:** Easy
**Category:** Array, Backtracking, Hash Table

## Problem

You are given an array `digits` of single-digit numbers. Using three *different positions* from `digits` (not necessarily different values, since the array may contain duplicate digits), form 3-digit even numbers with no leading zero. Return the count of distinct integer values that can be formed this way.

### Example

`digits = [1,2,3,4]` → picking three different positions and arranging them so the number is even (last digit is 2 or 4) and doesn't start with 0 yields several distinct 3-digit numbers such as `124`, `132`, `142`, and so on; the total count of distinct such numbers is the answer.

## Approach

Since `digits` is small, brute-force every ordered choice of three distinct positions `(i, j, k)`. Skip combinations where the first digit is `0` (leading zero) or the last digit is odd (not even). For every valid combination, compute the 3-digit value and insert it into a hash set to automatically deduplicate. The final answer is the size of the set.

## C# Solution

```csharp
public class Solution 
{
    public int TotalNumbers(int[] digits) 
    {
        HashSet<int> unique = new HashSet<int>();
        int n = digits.Length;

        for (int i = 0; i < n; i++)
        {
            if (digits[i] == 0) continue;
            for (int j = 0; j < n; j++)
            {
                if (j == i) continue;
                for (int k = 0; k < n; k++)
                {
                    if (k == i || k == j) continue;
                    if (digits[k] % 2 != 0) continue;

                    int num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    unique.Add(num);
                }
            }
        }

        return unique.Count;
    }
}
```

## Complexity

- **Time:** O(n^3)
- **Space:** O(n^3) in the worst case for the hash set
