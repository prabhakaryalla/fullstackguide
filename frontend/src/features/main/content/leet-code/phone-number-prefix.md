# 3491. Phone Number Prefix

**Difficulty:** Easy
**Category:** Array, String, Sorting, Trie
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an array of strings `phoneNumbers` representing distinct phone numbers. Determine whether **no** phone number in the array is a prefix of another phone number. Return `true` if that holds for every pair, otherwise return `false`.

### Example

```
Input: phoneNumbers = ["123","4567","123456"]
Output: false
Explanation: "123" is a prefix of "123456".

Input: phoneNumbers = ["123","456","789"]
Output: true
Explanation: No number is a prefix of another.
```

## Approach

Sort the strings lexicographically. If a string `a` is a prefix of another string `b`, then after sorting, `a` and `b` are separated only by other strings that also share the prefix `a`, so `a` is guaranteed to be adjacent to at least one string that starts with it — specifically its immediate neighbor in sorted order. Therefore it suffices to check every adjacent pair after sorting: if `arr[i]` is a prefix of `arr[i + 1]`, the answer is `false`.

## C# Solution

```csharp
public class Solution 
{
    public bool PhonePrefix(string[] phoneNumbers) 
    {
        string[] arr = (string[])phoneNumbers.Clone();
        Array.Sort(arr, StringComparer.Ordinal);
        for (int i = 0; i + 1 < arr.Length; i++)
        {
            if (arr[i + 1].StartsWith(arr[i], StringComparison.Ordinal))
            {
                return false;
            }
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n log n + L), where n is the number of phone numbers and L is the total length of all strings.
- **Space:** O(n) for the sorted copy.
