# 1404. Number of Steps to Reduce a Number in Binary Representation to One

**Difficulty:** Medium
**Category:** String, Math, Bit Manipulation, Simulation

## Problem

Given the binary string representation `s` of a number, in one step: if the number is even, divide it by two; if the number is odd, add one to it. Return the number of steps required to reduce it to `1`.

### Example

```
Input: s = "1101"
Output: 6
Explanation: "1101" -> "1110" -> "0111" -> "1000" -> "0100" -> "0010" -> "0001"
```

## Approach

Simulating bit-by-bit avoids big-integer arithmetic. Process the string from right to left, tracking a `carry` produced by "add one" operations. For each bit (plus any incoming carry), if the resulting value is odd, an "add 1" step is needed (which also produces a carry into the next, more significant bit) followed by the halving step for that position — 2 steps total. If the value is even, only a halving step is needed and the carry is unchanged. After processing all bits except the leading one, if a carry remains it becomes a new leading `1` bit that still needs to be divided down, contributing one final step.

## C# Solution

```csharp
public class Solution
{
    public int NumSteps(string s)
    {
        int steps = 0;
        int carry = 0;

        for (int i = s.Length - 1; i > 0; i--)
        {
            int current = (s[i] - '0') + carry;
            if (current % 2 == 1)
            {
                steps += 2;
                carry = 1;
            }
            else
            {
                steps += 1;
            }
        }

        return steps + carry;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `s`.
- **Space:** `O(1)`.
