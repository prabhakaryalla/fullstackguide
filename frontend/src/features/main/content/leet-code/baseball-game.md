# 682. Baseball Game

**Difficulty:** Easy
**Category:** Array, Stack, Simulation

## Problem

Given a list of string `operations` representing a baseball game's scoring log — an integer (a new score), `"+"` (sum of the previous two scores), `"D"` (double the previous score), or `"C"` (cancel/remove the previous score) — return the sum of all scores on the record after applying every operation.

### Example

```
Input: ops = ["5","2","C","D","+"]
Output: 30
```

### Constraints

- `1 <= operations.length <= 1000`

## Approach

Maintain a list acting as a stack of valid scores. Process each operation: append a parsed integer directly, append the sum of the last two entries for `"+"`, append double the last entry for `"D"`, or remove the last entry for `"C"`. Sum the final list for the answer.

## C# Solution

```csharp
public class Solution
{
    public int CalPoints(string[] operations)
    {
        var scores = new List<int>();

        foreach (var op in operations)
        {
            switch (op)
            {
                case "+":
                    scores.Add(scores[^1] + scores[^2]);
                    break;
                case "D":
                    scores.Add(scores[^1] * 2);
                    break;
                case "C":
                    scores.RemoveAt(scores.Count - 1);
                    break;
                default:
                    scores.Add(int.Parse(op));
                    break;
            }
        }

        return scores.Sum();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the scores list.
