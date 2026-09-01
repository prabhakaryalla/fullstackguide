# 1842. Next Palindrome Using Same Digits

**Difficulty:** Hard
**Category:** Math, String, Two Pointers, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a numeric palindrome string `num`, find the smallest palindrome strictly greater than `num` that uses exactly the same multiset of digits, or return an empty string if none exists.

### Example

```
Input: num = "1221"
Output: "2112"
```

## Approach

Since the string is a palindrome, its first half completely determines it (the second half mirrors the first, with a middle digit preserved for odd lengths). Compute the lexicographically next permutation of just the first half using the standard "next permutation" algorithm (find the longest non-increasing suffix, swap its predecessor with the smallest suffix element greater than it, then reverse the suffix). If the first half has no next permutation (it's already the largest arrangement, e.g. "2211" reversed pattern), no answer exists. Otherwise, mirror the new first half to build the full palindrome, keeping any middle digit unchanged.

## C# Solution

```csharp
public class Solution
{
    public string NextPalindrome(string num)
    {
        int n = num.Length;
        var half = num.Substring(0, n / 2).ToCharArray();

        if (!NextPermutation(half)) return "";

        var sb = new StringBuilder();
        sb.Append(half);
        if (n % 2 == 1) sb.Append(num[n / 2]);
        for (int i = half.Length - 1; i >= 0; i--) sb.Append(half[i]);

        return sb.ToString();
    }

    private bool NextPermutation(char[] arr)
    {
        int n = arr.Length;
        int i = n - 2;
        while (i >= 0 && arr[i] >= arr[i + 1]) i--;
        if (i < 0) return false;

        int j = n - 1;
        while (arr[j] <= arr[i]) j--;

        (arr[i], arr[j]) = (arr[j], arr[i]);
        Array.Reverse(arr, i + 1, n - i - 1);
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `num`.
- **Space:** `O(n)` for the half-digit buffer and output.
