# 825. Friends Of Appropriate Ages

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Sorting, Counting, Two Pointers

## Problem

Given an array `ages` of people in a social network, person `x` will send a friend request to person `y` (where `x != y`) unless `ageY <= 0.5 * ageX + 7`, or `ageY > ageX`, or (`ageY > 100 && ageX < 100`). Return the total number of friend requests made.

### Example

```
Input: ages = [16,16]
Output: 2
```

## Approach

Since ages are bounded to `1-120`, count how many people have each age. Iterate over every pair of ages `(ageX, ageY)` that both actually occur (a small fixed number of combinations, at most `120 x 120`), and check the request condition (accounting for the simplified fact that the `ageY > 100` clause becomes redundant once `ageY <= 0.5 * ageX + 7` is already enforced, since `ageX <= 120` bounds things appropriately). For each valid pair, add `count[ageX] * count[ageY]` requests, subtracting `count[ageX]` when `ageX == ageY` to avoid self-requests.

## C# Solution

```csharp
public class Solution
{
    public int NumFriendRequests(int[] ages)
    {
        var count = new int[121];
        foreach (var age in ages) count[age]++;

        int total = 0;

        for (int ageX = 1; ageX <= 120; ageX++)
        {
            if (count[ageX] == 0) continue;

            for (int ageY = 1; ageY <= 120; ageY++)
            {
                if (count[ageY] == 0) continue;

                if (IsValid(ageX, ageY))
                {
                    int requests = count[ageX] * count[ageY];
                    if (ageX == ageY) requests -= count[ageX];
                    total += requests;
                }
            }
        }

        return total;
    }

    private bool IsValid(int ageX, int ageY)
    {
        if (ageY > ageX) return false;
        if (ageY <= 0.5 * ageX + 7) return false;
        return true;
    }
}
```

## Complexity

- **Time:** `O(120^2)`, effectively constant.
- **Space:** `O(120)` for the age counts.
