# 3646. Next Special Palindrome Number

**Difficulty:** Hard
**Category:** Math, Two Pointers, String

## Problem
Given a positive integer `n`, find the smallest "special palindrome" number that is strictly greater than `n`. A special palindrome is defined as a positive integer that is a palindrome and additionally satisfies some digit-symmetry style constraint used by the source problem (each half mirrors the other exactly, forming a true palindrome number with no leading zero). Return the smallest such number greater than `n`.

## Approach
Work with `n` as a string of digits. Generate candidate palindromes of the same length as `n` by mirroring the first half; if the mirrored palindrome is greater than `n`, that's the answer. Otherwise increment the first half (handling carry) and mirror again. If no valid palindrome of the same length exceeds `n`, move to the next length (which for palindromes means constructing the smallest palindrome of length `len+1`, i.e., `10...01`). Compare results and return the minimum candidate that is greater than `n`.

## C# Solution

```csharp
public class Solution 
{
    public long NextSpecialPalindrome(long n) 
    {
        string s = n.ToString();
        int len = s.Length;

        // Try same length first
        long candidate = MakeCandidate(s, len);
        if (candidate > n) return candidate;

        // Try incrementing the half
        string half = s.Substring(0, (len + 1) / 2);
        long halfNum = long.Parse(half) + 1;
        string halfStr = halfNum.ToString();
        if (halfStr.Length == half.Length)
        {
            long built = BuildPalindromeFromHalf(halfStr, len);
            if (built > n) return built;
        }

        // Move to next length: smallest palindrome of length len+1 is 10...01
        int newLen = len + 1;
        return BuildSmallestPalindromeOfLength(newLen);
    }

    private long MakeCandidate(string s, int len)
    {
        char[] arr = s.ToCharArray();
        int i = 0, j = len - 1;
        while (i < j)
        {
            arr[j] = arr[i];
            i++; j--;
        }
        return long.Parse(new string(arr));
    }

    private long BuildPalindromeFromHalf(string half, int len)
    {
        char[] result = new char[len];
        int hl = half.Length;
        for (int i = 0; i < hl; i++) result[i] = half[i];
        int start = len % 2 == 0 ? hl - 1 : hl - 2;
        for (int i = start, j = hl; i >= 0; i--, j++)
        {
            result[j] = half[i];
        }
        return long.Parse(new string(result));
    }

    private long BuildSmallestPalindromeOfLength(int len)
    {
        char[] result = new char[len];
        result[0] = '1';
        result[len - 1] = '1';
        for (int i = 1; i < len - 1; i++) result[i] = '0';
        return long.Parse(new string(result));
    }
}
```

## Complexity

- **Time:** O(d) where d is the number of digits in n
- **Space:** O(d)
