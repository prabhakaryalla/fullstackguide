# 1333. Filter Restaurants by Vegan-Friendly, Price and Distance

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given a list of restaurants `[id, rating, veganFriendly, price, distance]`, a `veganFriendly` filter flag, `maxPrice`, and `maxDistance`, return the ids of restaurants meeting all the criteria, sorted by rating descending, breaking ties by id descending.

### Example

```
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 1, maxPrice = 50, maxDistance = 10
Output: [3,1,5]
```

## Approach

Filter the list down to restaurants that satisfy the vegan-friendly requirement (when requested) and stay within the price and distance limits, then sort the survivors by rating descending, using id descending only to break ties.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FilterRestaurants(int[][] restaurants, int veganFriendly, int maxPrice, int maxDistance)
    {
        return restaurants
            .Where(r => (veganFriendly == 0 || r[2] == 1) && r[3] <= maxPrice && r[4] <= maxDistance)
            .OrderByDescending(r => r[1])
            .ThenByDescending(r => r[0])
            .Select(r => r[0])
            .ToList();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the filtered/sorted list.
