# 1286. Iterator for Combination

**Difficulty:** Medium
**Category:** String, Backtracking, Design, Bit Manipulation

## Problem

Design an iterator `CombinationIterator(characters, combinationLength)` over the combinations of length `combinationLength` formed from a sorted, distinct-character string `characters`, returned in lexicographical order, supporting `Next()` and `HasNext()`.

### Example

```
Input: characters = "abc", combinationLength = 2
Output order via Next(): "ab", "ac", "bc"
```

## Approach

Given the small input constraints, precompute every combination up front with standard index-based backtracking: recursively choose characters in increasing index order, so combinations are generated already in lexicographical order (since `characters` itself is sorted). Then `Next()` and `HasNext()` simply walk a pointer through this precomputed list.

## C# Solution

```csharp
public class CombinationIterator
{
    private readonly List<string> combinations = new();
    private int index;

    public CombinationIterator(string characters, int combinationLength)
    {
        Generate(characters, combinationLength, 0, new StringBuilder());
    }

    private void Generate(string characters, int length, int start, StringBuilder current)
    {
        if (current.Length == length)
        {
            combinations.Add(current.ToString());
            return;
        }

        for (int i = start; i < characters.Length; i++)
        {
            current.Append(characters[i]);
            Generate(characters, length, i + 1, current);
            current.Length--;
        }
    }

    public string Next()
    {
        return combinations[index++];
    }

    public bool HasNext()
    {
        return index < combinations.Count;
    }
}
```

## Complexity

- **Time:** `O(C(n, k))` to precompute all combinations; `O(1)` per `Next`/`HasNext` call.
- **Space:** `O(C(n, k) * k)` for the stored combinations.
