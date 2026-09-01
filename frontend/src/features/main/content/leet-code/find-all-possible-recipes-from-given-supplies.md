# 2115. Find All Possible Recipes from Given Supplies

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Graph, Topological Sort

## Problem

You have `recipes`, `ingredients` for each recipe, and `supplies`. A recipe can be created if all its ingredients are available (either as supplies or as other createable recipes). Return all recipes that can be created.

### Example

```
Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
Output: ["bread"]
```

## Approach

Model as a directed graph where each recipe depends on its ingredients. Use topological sort (Kahn's algorithm) starting from supplies. Process nodes (ingredients/recipes) in order, marking recipes as createable when all dependencies are met.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindAllRecipes(string[] recipes, IList<IList<string>> ingredients, string[] supplies)
    {
        var result = new List<string>();
        var available = new HashSet<string>(supplies);
        var recipeSet = new HashSet<string>(recipes);
        var graph = new Dictionary<string, List<string>>();
        var inDegree = new Dictionary<string, int>();
        
        for (int i = 0; i < recipes.Length; i++)
        {
            inDegree[recipes[i]] = ingredients[i].Count;
            foreach (var ing in ingredients[i])
            {
                if (!graph.ContainsKey(ing))
                    graph[ing] = new List<string>();
                graph[ing].Add(recipes[i]);
            }
        }
        
        var queue = new Queue<string>(available);
        while (queue.Count > 0)
        {
            var item = queue.Dequeue();
            if (graph.ContainsKey(item))
            {
                foreach (var recipe in graph[item])
                {
                    inDegree[recipe]--;
                    if (inDegree[recipe] == 0)
                    {
                        result.Add(recipe);
                        queue.Enqueue(recipe);
                    }
                }
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(V + E) where V is total items and E is ingredient dependencies
- **Space:** O(V + E)
