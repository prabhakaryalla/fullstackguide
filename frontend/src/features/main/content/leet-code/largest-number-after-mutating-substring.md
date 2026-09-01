# 1946. Largest Number After Mutating Substring

**Difficulty:** Medium
**Category:** Array, String, Greedy

## Problem

Given a numeric string `num` and an array `change` of length 10, you may pick at most one contiguous substring of `num` and replace each digit `d` in it with `change[d]`, and only if doing so does not decrease that digit's value at each replaced position while the resulting digit stays `>=` the original at the point mutation begins in a way that keeps the number as large as possible (formally: choose one substring to mutate — each digit `d` becomes `change[d]` — to maximize the resulting number, mutating only while it doesn't strictly decrease the number). Return the largest possible resulting numeric string.

### Example

```
Input: num = "132", change = [9,8,5,0,3,6,4,2,6,8]
Output: "832"
Explanation: Replace digit '1' (index 0) with change[1]=8 to get "832"; continuing would replace '3' with change[3]=0, which decreases the value, so stop.
```

### Constraints

- `1 <= num.length <= 10^5`
- `num` consists of digits only.
- `change.length == 10`
- `0 <= change[i] <= 9`

## Approach

Scan `num` left to right. Before starting the mutation, skip digits where `change[d] <= d` (mutating them wouldn't help, and starting the substring there would only make things worse or equal at best). Begin mutating at the first digit where `change[d] > d`, replacing it and continuing to replace subsequent digits as long as `change[d] >= d` (equality is fine mid-mutation since it doesn't decrease value but we must stop once a strictly decreasing replacement would occur, i.e., once `change[d] < d`). Once the mutation stops (either a decreasing digit is hit or the string ends), no further changes are applied since only one contiguous substring may be mutated.

## C# Solution

```csharp
public class Solution
{
    public string MaximumNumber(string num, int[] change)
    {
        var digits = num.ToCharArray();
        bool mutating = false;
        bool started = false;

        for (int i = 0; i < digits.Length; i++)
        {
            int d = digits[i] - '0';
            int newDigit = change[d];

            if (newDigit > d)
            {
                digits[i] = (char)('0' + newDigit);
                mutating = true;
                started = true;
            }
            else if (newDigit < d)
            {
                if (mutating)
                {
                    break;
                }
            }
            else
            {
                if (mutating)
                {
                    digits[i] = (char)('0' + newDigit);
                }
            }
        }

        return new string(digits);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass through the digits.
- **Space:** `O(n)` for the character array.
