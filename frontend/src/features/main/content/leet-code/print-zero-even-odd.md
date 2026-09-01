# 1116. Print Zero Even Odd

**Difficulty:** Medium
**Category:** Concurrency

## Problem

The same `ZeroEvenOdd` instance is shared by three threads that call `Zero()`, `Even()`, and `Odd()` respectively. Together they must print the sequence `0102030405...` up to `n` (a `0` before every number, then the number itself), with even numbers coming from the `Even` thread and odd numbers from the `Odd` thread.

### Example

```
Input: n = 2
Output: "0102"
```

## Approach

Use three semaphores as a token-passing chain: `zeroSemaphore` starts signaled so `Zero` runs first. After printing `0`, `Zero` releases either `evenSemaphore` or `oddSemaphore` depending on whether the next number is even or odd. `Even`/`Odd` wait on their own semaphore, print their number, increment the shared counter, and hand control back to `zeroSemaphore` for the next round.

## C# Solution

```csharp
public class ZeroEvenOdd
{
    private readonly int n;
    private int current = 1;
    private readonly SemaphoreSlim zeroSemaphore = new(1);
    private readonly SemaphoreSlim evenSemaphore = new(0);
    private readonly SemaphoreSlim oddSemaphore = new(0);

    public ZeroEvenOdd(int n)
    {
        this.n = n;
    }

    public void Zero(Action<int> printNumber)
    {
        for (int i = 0; i < n; i++)
        {
            zeroSemaphore.Wait();
            printNumber(0);
            if (current % 2 == 0) evenSemaphore.Release();
            else oddSemaphore.Release();
        }
    }

    public void Even(Action<int> printNumber)
    {
        for (int i = 2; i <= n; i += 2)
        {
            evenSemaphore.Wait();
            printNumber(current);
            current++;
            zeroSemaphore.Release();
        }
    }

    public void Odd(Action<int> printNumber)
    {
        for (int i = 1; i <= n; i += 2)
        {
            oddSemaphore.Wait();
            printNumber(current);
            current++;
            zeroSemaphore.Release();
        }
    }
}
```

## Complexity

- **Time:** `O(n)` synchronization operations total.
- **Space:** `O(1)` for the three semaphores.
