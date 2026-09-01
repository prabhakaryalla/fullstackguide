# 2843. Count Symmetric Integers

**Difficulty:** Easy
**Category:** Math, String

## Problem

You are given two positive integers low and high.

An integer x consisting of 2 * n digits is symmetric if the sum of the first n digits of x is equal to the sum of the last n digits of x. Numbers with an odd number of digits are never symmetric.

Return the number of symmetric integers in the range [low, high].

### Example

```
Input: low = 1, high = 100
Output: 9
Explanation: 11, 22, 33, 44, 55, 66, 77, 88, 99 are symmetric
```

## Approach

We iterate through all numbers in the range [low, high] and check if each is symmetric.

For a number to be symmetric:
1. Convert it to a string to easily access digits
2. Check if the length is even (odd-length numbers cannot be symmetric)
3. Split the number into two halves
4. Sum the digits of the first half and the second half
5. If the sums are equal, the number is symmetric

## C# Solution

```csharp
public class Solution
{
    public int CountSymmetricIntegers(int low, int high)
    {
        int count = 0;
        
        for (int num = low; num <= high; num++)
        {
            if (IsSymmetric(num))
                count++;
        }
        
        return count;
    }
    
    private bool IsSymmetric(int num)
    {
        string s = num.ToString();
        int n = s.Length;
        
        if (n % 2 != 0)
            return false;
        
        int half = n / 2;
        int leftSum = 0;
        int rightSum = 0;
        
        for (int i = 0; i < half; i++)
        {
            leftSum += s[i] - '0';
            rightSum += s[i + half] - '0';
        }
        
        return leftSum == rightSum;
    }
}
```

## Complexity

- **Time:** O((high - low) * log(high)) where log(high) is the number of digits
- **Space:** O(log(high)) for string conversion
