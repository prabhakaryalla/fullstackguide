# 2525. Categorize Box According to Criteria

**Difficulty:** Easy
**Category:** Math

## Problem

Given four integers `length`, `width`, `height`, and `mass` representing the dimensions and mass of a box, categorize it according to the following criteria:
- "Bulky" if any dimension ≥ 10^4 or volume ≥ 10^9
- "Heavy" if mass ≥ 100
- "Both" if both Bulky and Heavy
- "Neither" if neither Bulky nor Heavy

### Example

```
Input: length = 1000, width = 35, height = 700, mass = 300
Output: "Heavy"
Explanation: None of the dimensions is >= 10^4, and volume = 1000 × 35 × 700 = 24,500,000 < 10^9, so not bulky. But mass = 300 >= 100, so it's Heavy.
```

## Approach

Check each criterion directly: calculate if the box is bulky by checking dimensions and volume, check if it's heavy by comparing mass. Then combine the results to determine the category.

## C# Solution

```csharp
public class Solution
{
    public string CategorizeBox(int length, int width, int height, int mass)
    {
        bool isBulky = length >= 10000 || width >= 10000 || height >= 10000 || 
                       (long)length * width * height >= 1000000000;
        bool isHeavy = mass >= 100;
        
        if (isBulky && isHeavy)
        {
            return "Both";
        }
        else if (isBulky)
        {
            return "Bulky";
        }
        else if (isHeavy)
        {
            return "Heavy";
        }
        else
        {
            return "Neither";
        }
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
