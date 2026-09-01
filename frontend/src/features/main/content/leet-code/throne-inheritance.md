# 1600. Throne Inheritance

**Difficulty:** Medium
**Category:** Tree, Hash Table, Design, Depth-First Search

## Problem

Design a class modeling a family tree with a king, supporting `Birth(parentName, childName)`, `Death(name)` (marking a person as dead, but keeping them in the tree structure for succession order), and `GetInheritanceOrder()`, which returns names in the current succession order (a pre-order traversal of the family tree, skipping deceased members).

### Example

```
Input: birth("king", "andy"), birth("king", "bob"), death("king"), getInheritanceOrder()
Output: ["andy", "bob"]
```

## Approach

Maintain a map from each person's name to their list of children (in birth order), and a set of names who have died. `Birth` simply appends the child's name to the parent's children list. `Death` adds the name to the dead set. `GetInheritanceOrder` performs a pre-order depth-first traversal starting from the king: visit a person (adding their name to the result only if they're alive), then recursively visit each of their children in birth order.

## C# Solution

```csharp
public class ThroneInheritance
{
    private readonly string king;
    private readonly Dictionary<string, List<string>> children = new Dictionary<string, List<string>>();
    private readonly HashSet<string> dead = new HashSet<string>();

    public ThroneInheritance(string kingName)
    {
        king = kingName;
        children[kingName] = new List<string>();
    }

    public void Birth(string parentName, string childName)
    {
        if (!children.ContainsKey(parentName))
        {
            children[parentName] = new List<string>();
        }
        children[parentName].Add(childName);
        children[childName] = new List<string>();
    }

    public void Death(string name)
    {
        dead.Add(name);
    }

    public IList<string> GetInheritanceOrder()
    {
        var result = new List<string>();
        Dfs(king, result);
        return result;
    }

    private void Dfs(string name, List<string> result)
    {
        if (!dead.Contains(name))
        {
            result.Add(name);
        }

        foreach (string child in children[name])
        {
            Dfs(child, result);
        }
    }
}
```

## Complexity

- **Time:** `O(n)` for `Birth`/`Death`; `O(n)` for `GetInheritanceOrder`, visiting every person once.
- **Space:** `O(n)` for the family tree structure and dead-members set.
