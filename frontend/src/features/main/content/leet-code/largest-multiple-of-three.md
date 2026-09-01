# 1363. Largest Multiple of Three

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Math, Greedy, Sorting

## Problem

Given an array of single `digits`, return the largest multiple of three that can be formed by concatenating some of them in any order, as a string (with no leading zeros unless the result is `"0"`).

### Example

```
Input: digits = [8,1,9]
Output: "981"
```

## Approach

Sort digits descending to maximize the resulting number, and use the digit-sum rule for divisibility by three. If the total sum's remainder mod 3 is `0`, keep everything; if it's `1`, remove the single smallest digit whose own remainder is `1` (or, failing that, the two smallest digits whose remainder is `2`); symmetrically for a remainder of `2`. After removals, drop any leading zeros while keeping at least one digit.

## C# Solution

```csharp
public class Solution
{
    public string LargestMultipleOfThree(int[] digits)
    {
        Array.Sort(digits);
        Array.Reverse(digits);

        int sum = digits.Sum();
        var list = digits.ToList();

        if (sum % 3 != 0)
        {
            int need = sum % 3;
            var byMod = new List<int>[] { new List<int>(), new List<int>(), new List<int>() };
            for (int i = list.Count - 1; i >= 0; i--) byMod[list[i] % 3].Add(list[i]);

            bool Remove(int count, int mod)
            {
                if (byMod[mod].Count < count) return false;
                for (int k = 0; k < count; k++)
                {
                    int val = byMod[mod][^1];
                    byMod[mod].RemoveAt(byMod[mod].Count - 1);
                    list.Remove(val);
                }
                return true;
            }

            if (need == 1)
            {
                if (!Remove(1, 1)) Remove(2, 2);
            }
            else
            {
                if (!Remove(1, 2)) Remove(2, 1);
            }
        }

        list.Sort((a, b) => b - a);
        int firstNonZero = list.FindIndex(d => d != 0);

        if (list.Count == 0) return "";
        if (firstNonZero == -1) return "0";

        return string.Concat(list);
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the digit groupings.
