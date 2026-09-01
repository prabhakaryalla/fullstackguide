# 1195. Fizz Buzz Multithreaded

**Difficulty:** Medium
**Category:** Concurrency

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Four threads share the same `FizzBuzz` instance and call `Fizz()`, `Buzz()`, `Fizzbuzz()`, and `Number(printNumber)` respectively. Together, for numbers `1` to `n`, they must print `"fizz"` for multiples of `3` (not `5`), `"buzz"` for multiples of `5` (not `3`), `"fizzbuzz"` for multiples of both, and the number itself otherwise — in strictly increasing numeric order.

### Example

```
Input: n = 15
Output: "1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz"
```

## Approach

Use a monitor (a shared lock with `Wait`/`PulseAll`) guarding a single shared counter. Each method loops while the counter hasn't exceeded `n`: it waits on the lock until either the counter matches the condition that method is responsible for, or the counter has run out. Once its condition is met, it prints, advances the shared counter, and wakes up all other waiting threads so they can re-check whether it's now their turn.

## C# Solution

```csharp
public class FizzBuzz
{
    private readonly int n;
    private int current = 1;
    private readonly object lockObj = new();

    public FizzBuzz(int n)
    {
        this.n = n;
    }

    public void Fizz(Action printFizz)
    {
        lock (lockObj)
        {
            while (current <= n)
            {
                while (current <= n && !(current % 3 == 0 && current % 5 != 0)) Monitor.Wait(lockObj);
                if (current > n) break;
                printFizz();
                current++;
                Monitor.PulseAll(lockObj);
            }
        }
    }

    public void Buzz(Action printBuzz)
    {
        lock (lockObj)
        {
            while (current <= n)
            {
                while (current <= n && !(current % 5 == 0 && current % 3 != 0)) Monitor.Wait(lockObj);
                if (current > n) break;
                printBuzz();
                current++;
                Monitor.PulseAll(lockObj);
            }
        }
    }

    public void Fizzbuzz(Action printFizzBuzz)
    {
        lock (lockObj)
        {
            while (current <= n)
            {
                while (current <= n && current % 15 != 0) Monitor.Wait(lockObj);
                if (current > n) break;
                printFizzBuzz();
                current++;
                Monitor.PulseAll(lockObj);
            }
        }
    }

    public void Number(Action<int> printNumber)
    {
        lock (lockObj)
        {
            while (current <= n)
            {
                while (current <= n && (current % 3 == 0 || current % 5 == 0)) Monitor.Wait(lockObj);
                if (current > n) break;
                printNumber(current);
                current++;
                Monitor.PulseAll(lockObj);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(n)` synchronization operations total.
- **Space:** `O(1)`.
