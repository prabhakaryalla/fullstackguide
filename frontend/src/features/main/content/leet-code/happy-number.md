# 202. Happy Number

**Difficulty:** Easy
**Category:** Hash Table, Math, Two Pointers

## Problem

Determine whether a positive integer `n` is "happy": repeatedly replace it with the sum of the squares of its digits; if this process reaches `1`, the number is happy. If it loops endlessly without reaching `1`, it is not.

### Example

```
n = 19 -> true   (19 -> 82 -> 68 -> 100 -> 1)
n = 2 -> false
```

## Approach

Since the digit-square-sum sequence either reaches `1` or enters a cycle, this is really cycle detection. Use Floyd's slow/fast pointer technique: advance `slow` one transformation per step and `fast` two transformations per step; if they meet at a value other than `1`, a cycle was found (not happy); if `fast` reaches `1` first, the number is happy.

## C# Solution

```csharp
public class Solution
{
    public bool IsHappy(int n)
    {
        int slow = n, fast = NextValue(n);

        while (fast != 1 && slow != fast)
        {
            slow = NextValue(slow);
            fast = NextValue(NextValue(fast));
        }

        return fast == 1;
    }

    private int NextValue(int n)
    {
        int sum = 0;

        while (n > 0)
        {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(log n)` — the sequence quickly drops below a small bound, after which detection is fast.
- **Space:** `O(1)`.
