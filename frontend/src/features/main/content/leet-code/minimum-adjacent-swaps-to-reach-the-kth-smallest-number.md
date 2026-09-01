# 1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number

**Difficulty:** Medium
**Category:** String, Two Pointers, Greedy

## Problem

Given a numeric string `num` and an integer `k`, find the permutation of `num`'s digits that is the `k`-th lexicographically-next arrangement greater than `num`, then return the minimum number of adjacent digit swaps needed to transform `num` into that target arrangement.

### Example

```
Input: num = "5489355142", k = 4
Output: 2
```

## Approach

Apply the standard "next permutation" digit transformation `k` times to a copy of `num`'s digits to obtain the target arrangement. Then compute the minimum adjacent swaps to turn the original digit sequence into the target: for each position left to right, if it doesn't already match the target digit, find the nearest later position holding the needed digit and bubble it left one swap at a time — this greedy method is optimal because each swap fixes one position permanently without disturbing already-correct earlier positions, and the total swap count equals the number of adjacent transpositions between the two sequences.

## C# Solution

```csharp
public class Solution
{
    public int GetMinSwaps(string num, int k)
    {
        var target = num.ToCharArray();
        for (int i = 0; i < k; i++) NextPermutation(target);

        var original = num.ToCharArray();
        return CountSwaps(original, target);
    }

    private void NextPermutation(char[] arr)
    {
        int n = arr.Length;
        int i = n - 2;
        while (i >= 0 && arr[i] >= arr[i + 1]) i--;

        int j = n - 1;
        while (arr[j] <= arr[i]) j--;

        (arr[i], arr[j]) = (arr[j], arr[i]);
        Array.Reverse(arr, i + 1, n - i - 1);
    }

    private int CountSwaps(char[] original, char[] target)
    {
        int n = original.Length;
        int swaps = 0;

        for (int i = 0; i < n; i++)
        {
            if (original[i] == target[i]) continue;

            int j = i + 1;
            while (original[j] != target[i]) j++;

            while (j > i)
            {
                (original[j], original[j - 1]) = (original[j - 1], original[j]);
                j--;
                swaps++;
            }
        }

        return swaps;
    }
}
```

## Complexity

- **Time:** `O(n * k + n^2)` — `k` next-permutation passes over `n` digits, plus an `O(n^2)` swap-count pass.
- **Space:** `O(n)` for the digit buffers.
