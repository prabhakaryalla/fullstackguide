# 1575. Count All Possible Routes

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an array `locations` of distinct city coordinates, a `start` city, a `finish` city, and a `fuel` budget, count the number of distinct routes from `start` to `finish`. Moving from city `i` to city `j` costs `|locations[i] - locations[j]|` fuel, fuel can never go negative, and a city may be revisited any number of times (including the finish city, even as an intermediate stop). Return the count modulo `10^9 + 7`.

### Example

```
Input: locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5
Output: 4
```

## Approach

Use memoized recursion on `(currentCity, remainingFuel)`: the number of distinct routes from `currentCity` to `finish` using at most `remainingFuel`. At each state, if `currentCity == finish`, count that as one valid route (and continue exploring further moves too, since the finish can be a mid-route stop). Then try moving to every other city `next`, provided there's enough fuel for the trip, recursively adding the routes achievable with the reduced fuel.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private int[] locations = null!;
    private int[,] memo = null!;

    public int CountRoutes(int[] locations, int start, int finish, int fuel)
    {
        this.locations = locations;
        int n = locations.Length;
        memo = new int[n, fuel + 1];
        for (int i = 0; i < n; i++)
        {
            for (int f = 0; f <= fuel; f++)
            {
                memo[i, f] = -1;
            }
        }

        return Dp(start, fuel, finish);
    }

    private int Dp(int current, int remainingFuel, int finish)
    {
        if (memo[current, remainingFuel] != -1)
        {
            return memo[current, remainingFuel];
        }

        long routes = current == finish ? 1 : 0;

        for (int next = 0; next < locations.Length; next++)
        {
            if (next == current)
            {
                continue;
            }

            int cost = Math.Abs(locations[current] - locations[next]);
            if (cost <= remainingFuel)
            {
                routes = (routes + Dp(next, remainingFuel - cost, finish)) % Mod;
            }
        }

        memo[current, remainingFuel] = (int)routes;
        return (int)routes;
    }
}
```

## Complexity

- **Time:** `O(n^2 * fuel)` — `n * fuel` distinct states, each trying `n` possible next cities.
- **Space:** `O(n * fuel)` for the memoization table.
