# 278. First Bad Version

**Difficulty:** Easy
**Category:** Binary Search, Interactive

## Problem

You are a product manager and have `n` versions `[1, 2, ..., n]`. You have access to an API `IsBadVersion(version)` that returns whether a given version is bad. Since all versions after a bad one are also bad, find and return the first bad version, minimizing calls to the API.

### Example

```
Input: n = 5, bad = 4
Output: 4
```

### Constraints

- `1 <= bad <= n <= 2^31 - 1`

## Approach

Binary search over the version range: check the midpoint version. If it's bad, the first bad version is at or before the midpoint, so search the left half (including the midpoint); otherwise, search strictly to the right. This narrows the search space by half each time.

## C# Solution

```csharp
public class Solution : VersionControl
{
    public int FirstBadVersion(int n)
    {
        int left = 1, right = n;

        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (IsBadVersion(mid)) right = mid;
            else left = mid + 1;
        }

        return left;
    }
}
```

## Complexity

- **Time:** `O(log n)` — binary search over the version range.
- **Space:** `O(1)`.
