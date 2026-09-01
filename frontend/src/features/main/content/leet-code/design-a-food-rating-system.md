# 2429. Design a Food Rating System

**Difficulty:** Medium
**Category:** Hash Table, Design, Heap (Priority Queue), Ordered Set

## Problem

Design a food rating system that can do the following:

- Modify the rating of a food item listed in the system.
- Return the highest-rated food item for a type of cuisine in the system.

Implement the `FoodRatings` class:

- `FoodRatings(String[] foods, String[] cuisines, int[] ratings)` Initializes the system.
- `void changeRating(String food, int newRating)` Changes the rating of the food item with the name `food`.
- `String highestRated(String cuisine)` Returns the name of the food item that has the highest rating for the given type of `cuisine`.

### Example

```
Input: ["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], 
  ["korean", "japanese", "japanese", "greek", "japanese", "korean"], 
  [9, 12, 8, 15, 14, 7]], 
 ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output: [null, "kimchi", "ramen", null, "sushi", null, "ramen"]
```

## Approach

Use multiple data structures:
- Hash map from food name to its cuisine and current rating
- For each cuisine, maintain a sorted set (priority queue) of foods by rating (descending) and name (ascending lexicographically as tiebreaker)

## C# Solution

```csharp
public class FoodRatings
{
    private Dictionary<string, (string cuisine, int rating)> foodInfo;
    private Dictionary<string, SortedSet<(int rating, string name)>> cuisineRatings;

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings)
    {
        foodInfo = new Dictionary<string, (string, int)>();
        cuisineRatings = new Dictionary<string, SortedSet<(int, string)>>();
        
        var comparer = Comparer<(int rating, string name)>.Create((a, b) =>
        {
            if (a.rating != b.rating) return b.rating.CompareTo(a.rating);
            return a.name.CompareTo(b.name);
        });
        
        for (int i = 0; i < foods.Length; i++)
        {
            foodInfo[foods[i]] = (cuisines[i], ratings[i]);
            
            if (!cuisineRatings.ContainsKey(cuisines[i]))
            {
                cuisineRatings[cuisines[i]] = new SortedSet<(int, string)>(comparer);
            }
            
            cuisineRatings[cuisines[i]].Add((ratings[i], foods[i]));
        }
    }
    
    public void ChangeRating(string food, int newRating)
    {
        var (cuisine, oldRating) = foodInfo[food];
        cuisineRatings[cuisine].Remove((oldRating, food));
        cuisineRatings[cuisine].Add((newRating, food));
        foodInfo[food] = (cuisine, newRating);
    }
    
    public string HighestRated(string cuisine)
    {
        return cuisineRatings[cuisine].Min.name;
    }
}
```

## Complexity

- **Time:** O(log n) per operation where n is the number of foods per cuisine
- **Space:** O(n) where n is the total number of foods
