# 1585. Check If String Is Transformable With Substring Sort Operations

**Difficulty:** Hard
**Category:** String, Greedy, Sorting

## Problem

Given two digit strings `s` and `t` of the same length, you may repeatedly select any substring of `s` and sort its digits in-place (ascending). Return `true` if `s` can be transformed into `t` using any number of such operations.

### Example

```
Input: s = "84532", t = "34852"
Output: true
```

## Approach

Sorting a substring is equivalent to being able to perform any sequence of adjacent swaps that fix an inversion (i.e., swap a larger digit left of a smaller digit), so a digit can move left only past strictly larger digits, never past an equal-or-smaller digit. Maintain a queue of remaining positions for each digit `0`-`9` in `s`. For each digit required by `t`, take the earliest available position of that digit from its queue; this move is only valid if no *smaller* remaining digit still sits at an earlier position (since that digit would block the required leftward movement). If valid, consume that position; otherwise, the transformation is impossible.

## C# Solution

```csharp
public class Solution
{
    public bool IsTransformable(string s, string t)
    {
        int n = s.Length;
        var positions = new Queue<int>[10];
        for (int d = 0; d < 10; d++)
        {
            positions[d] = new Queue<int>();
        }

        for (int i = 0; i < n; i++)
        {
            positions[s[i] - '0'].Enqueue(i);
        }

        for (int i = 0; i < n; i++)
        {
            int digit = t[i] - '0';

            if (positions[digit].Count == 0)
            {
                return false;
            }

            int idx = positions[digit].Peek();

            for (int smaller = 0; smaller < digit; smaller++)
            {
                if (positions[smaller].Count > 0 && positions[smaller].Peek() < idx)
                {
                    return false;
                }
            }

            positions[digit].Dequeue();
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * 10)` — a constant amount of extra work (checking 10 digit queues) per character.
- **Space:** `O(n)` for the digit position queues.
