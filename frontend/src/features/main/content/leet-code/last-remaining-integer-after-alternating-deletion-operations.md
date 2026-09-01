# 3782. Last Remaining Integer After Alternating Deletion Operations

**Difficulty:** Hard
**Category:** Math, Recursion

## Problem

Write integers 1 to `n` in a sequence. Alternately apply, starting with operation 1: (1) delete every second number from the left, (2) delete every second number from the right, until one integer remains. Return that integer.

### Example

Input: `n = 8`
Output: `3`

## Approach

Track the surviving sequence as an arithmetic progression with first term `a`, count `cnt`, and common difference `d`, plus the direction of the next deletion. A left-delete always keeps position 1 (`a` unchanged); a right-delete keeps position 1 (`a` unchanged) if `cnt` is odd, or shifts to the second term (`a += d`) if `cnt` is even. Either way `cnt` becomes `ceil(cnt/2)` and `d` doubles. Repeat until `cnt == 1`.

## C# Solution

```csharp
public class Solution 
{
    public long LastRemaining(long n) 
    {
        long a = 1, cnt = n, d = 1;
        bool leftNext = true;
        while (cnt > 1)
        {
            if (leftNext)
            {
                // a unchanged
            }
            else
            {
                if (cnt % 2 == 0) a += d;
            }
            cnt = (cnt + 1) / 2;
            d *= 2;
            leftNext = !leftNext;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
