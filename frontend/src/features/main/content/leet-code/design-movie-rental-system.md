# 1912. Design Movie Rental System

**Difficulty:** Hard
**Category:** Array, Hash Table, Design, Sorting, Heap (Priority Queue), Ordered Set

## Problem

Design a movie rental system supporting: `Search(movie)` — return up to 5 cheapest unrented shops carrying `movie` (ties broken by smaller shop id); `Rent(shop, movie)` — mark it rented; `Drop(shop, movie)` — mark it returned; `Report()` — return up to 5 cheapest rented movies overall as `[shop, movie]` pairs, ordered by price then shop then movie.

### Example

```
Input: entries = [[0,1,5],[0,2,6],[0,3,7],[1,1,4],[1,2,7],[2,1,5]]
System.Search(1) -> [1,0,2] (unrented shops with movie 1, cheapest first)
System.Rent(0,1); System.Rent(1,2)
System.Report() -> [[0,1],[1,2]]
```

### Constraints

- `1 <= entries.length <= 10^5`
- `0 <= shop, movie <= 10^5`
- `0 <= price <= 10^4`
- At most `10^5` total calls to all methods.

## Approach

Maintain a dictionary from `(shop, movie)` to `price`, a dictionary mapping each `movie` to a sorted set of `(price, shop)` for currently unrented copies, and a global sorted set of `(price, shop, movie)` for all currently rented copies. `Search` queries the movie's sorted set for the first 5 entries. `Rent` moves an entry from the movie's unrented set into the global rented set (and records rented state per key); `Drop` reverses that. `Report` reads the first 5 entries of the global rented sorted set.

## C# Solution

```csharp
public class MovieRentingSystem
{
    private readonly Dictionary<(int shop, int movie), int> _price = new();
    private readonly HashSet<(int shop, int movie)> _rented = new();
    private readonly Dictionary<int, SortedSet<(int price, int shop)>> _unrentedByMovie = new();
    private readonly SortedSet<(int price, int shop, int movie)> _rentedGlobal = new();

    public MovieRentingSystem(int n, int[][] entries)
    {
        foreach (var e in entries)
        {
            int shop = e[0], movie = e[1], price = e[2];
            _price[(shop, movie)] = price;
            if (!_unrentedByMovie.TryGetValue(movie, out var set))
            {
                set = new SortedSet<(int, int)>();
                _unrentedByMovie[movie] = set;
            }
            set.Add((price, shop));
        }
    }

    public IList<int> Search(int movie)
    {
        var result = new List<int>();
        if (_unrentedByMovie.TryGetValue(movie, out var set))
        {
            foreach (var (price, shop) in set)
            {
                result.Add(shop);
                if (result.Count == 5) break;
            }
        }
        return result;
    }

    public void Rent(int shop, int movie)
    {
        int price = _price[(shop, movie)];
        _unrentedByMovie[movie].Remove((price, shop));
        _rentedGlobal.Add((price, shop, movie));
        _rented.Add((shop, movie));
    }

    public void Drop(int shop, int movie)
    {
        int price = _price[(shop, movie)];
        _rentedGlobal.Remove((price, shop, movie));
        _unrentedByMovie[movie].Add((price, shop));
        _rented.Remove((shop, movie));
    }

    public IList<IList<int>> Report()
    {
        var result = new List<IList<int>>();
        foreach (var (price, shop, movie) in _rentedGlobal)
        {
            result.Add(new List<int> { shop, movie });
            if (result.Count == 5) break;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)` per `Rent`/`Drop` call, `O(1)` amortized per returned item for `Search`/`Report` (capped at 5).
- **Space:** `O(n)` for the price map and sorted sets.
