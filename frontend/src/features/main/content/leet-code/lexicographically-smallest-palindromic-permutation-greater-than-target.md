# 3734. Lexicographically Smallest Palindromic Permutation Greater Than Target

**Difficulty:** Hard
**Category:** String, Greedy, Two Pointers

## Problem
You are given a string `target` that is itself a palindrome. Consider every permutation of `target`'s characters that is also a palindrome. Among those permutations that are strictly greater than `target` lexicographically, return the smallest one. If no such permutation exists, return an empty string.

## Approach
A palindrome is fully determined by its first half (plus a middle character if the length is odd, which must always be the unique odd-frequency character). Since `target` is already a palindrome built from this exact character multiset, finding the smallest greater palindromic permutation reduces to finding the smallest greater permutation of `target`'s first half using the classic **next permutation** algorithm (which correctly handles duplicate characters).

If a next permutation of the first half exists, mirror it (and keep the unchanged middle character, if any) to build the new palindrome. If the first half is already at its lexicographically largest arrangement, no greater palindromic permutation exists.

## C# Solution

```csharp
public class Solution
{
    public string NextPalindrome(string target)
    {
        int n = target.Length;
        int halfLen = n / 2;
        char[] half = target.Substring(0, halfLen).ToCharArray();

        if (!NextPermutation(half))
        {
            return "";
        }

        char[] result = new char[n];
        for (int i = 0; i < halfLen; i++)
        {
            result[i] = half[i];
            result[n - 1 - i] = half[i];
        }
        if (n % 2 == 1)
        {
            result[halfLen] = target[halfLen];
        }

        return new string(result);
    }

    private bool NextPermutation(char[] arr)
    {
        int i = arr.Length - 2;
        while (i >= 0 && arr[i] >= arr[i + 1]) i--;
        if (i < 0) return false;

        int j = arr.Length - 1;
        while (arr[j] <= arr[i]) j--;

        (arr[i], arr[j]) = (arr[j], arr[i]);
        Array.Reverse(arr, i + 1, arr.Length - i - 1);
        return true;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
