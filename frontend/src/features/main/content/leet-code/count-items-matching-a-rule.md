# 1773. Count Items Matching a Rule

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given a list of `items` where `items[i] = [typei, colori, namei]`, and a rule described by `ruleKey` (`"type"`, `"color"`, or `"name"`) and `ruleValue`, return the number of items that match the rule.

### Example

```
Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], ruleKey = "color", ruleValue = "silver"
Output: 1
```

## Approach

Map `ruleKey` to the corresponding index (`0` for type, `1` for color, `2` for name), then count how many items have that index equal to `ruleValue`.

## C# Solution

```csharp
public class Solution
{
    public int CountMatches(IList<IList<string>> items, string ruleKey, string ruleValue)
    {
        int index = ruleKey switch
        {
            "type" => 0,
            "color" => 1,
            _ => 2
        };

        int count = 0;
        foreach (var item in items)
            if (item[index] == ruleValue) count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
