# 726. Number of Atoms

**Difficulty:** Hard
**Category:** Stack, String, Sorting

## Problem

Given a chemical formula string, parse it and return the count of each atom, formatted with atom names in sorted order followed by their count (omitted if exactly 1).

### Example

```
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
```

## Approach

Use recursive descent parsing driven by a shared position index. At the top level (and recursively inside parentheses), repeatedly parse either a nested group `(...)count` — recursing to get the inner atom counts, then multiplying every count by the trailing multiplier and merging into the running totals — or a plain atom name followed by an optional count. Stop parsing a group when a closing `)` or the end of the string is reached. Once fully parsed, format the atom counts in sorted order.

## C# Solution

```csharp
public class Solution
{
    private string formula;
    private int index;

    public string CountOfAtoms(string formula)
    {
        this.formula = formula;
        index = 0;

        var counts = ParseFormula();

        var sb = new StringBuilder();
        foreach (var pair in counts.OrderBy(p => p.Key, StringComparer.Ordinal))
        {
            sb.Append(pair.Key);
            if (pair.Value > 1) sb.Append(pair.Value);
        }

        return sb.ToString();
    }

    private Dictionary<string, int> ParseFormula()
    {
        var counts = new Dictionary<string, int>();

        while (index < formula.Length && formula[index] != ')')
        {
            if (formula[index] == '(')
            {
                index++;
                var innerCounts = ParseFormula();
                index++;

                int multiplier = ParseNumber();

                foreach (var pair in innerCounts)
                    counts[pair.Key] = counts.GetValueOrDefault(pair.Key) + pair.Value * multiplier;
            }
            else
            {
                var name = ParseName();
                int count = ParseNumber();
                counts[name] = counts.GetValueOrDefault(name) + count;
            }
        }

        return counts;
    }

    private string ParseName()
    {
        int start = index;
        index++;

        while (index < formula.Length && char.IsLower(formula[index]))
            index++;

        return formula.Substring(start, index - start);
    }

    private int ParseNumber()
    {
        int start = index;
        while (index < formula.Length && char.IsDigit(formula[index]))
            index++;

        return start == index ? 1 : int.Parse(formula.Substring(start, index - start));
    }
}
```

## Complexity

- **Time:** `O(n log n)`, dominated by sorting the final atom names.
- **Space:** `O(n)` for the parsed counts.
