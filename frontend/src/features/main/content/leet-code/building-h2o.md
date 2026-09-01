# 1117. Building H2O

**Difficulty:** Medium
**Category:** Concurrency

## Problem

Hydrogen and oxygen molecules arrive on separate threads calling `Hydrogen()` and `Oxygen()`. Design a mechanism that groups them correctly so that exactly two hydrogen threads and one oxygen thread release together to form each water molecule, with no molecule starting before the previous one has fully assembled.

### Example

```
Input: water = "HOH"
Output: "HHO" (or any permutation where each group of 3 has exactly 2 H and 1 O)
```

## Approach

Cap the number of hydrogen threads allowed into a molecule at `2` and oxygen threads at `1` using counting semaphores. Use a three-party `Barrier` so that a hydrogen or oxygen thread that has acquired its slot must wait until exactly three threads (2 H + 1 O) have arrived before any of them proceeds past the barrier — this guarantees molecules are released as complete, non-overlapping groups.

## C# Solution

```csharp
public class H2O
{
    private readonly SemaphoreSlim hydrogenSemaphore = new(2, 2);
    private readonly SemaphoreSlim oxygenSemaphore = new(1, 1);
    private readonly Barrier barrier = new(3);

    public void Hydrogen(Action releaseHydrogen)
    {
        hydrogenSemaphore.Wait();
        releaseHydrogen();
        barrier.SignalAndWait();
        hydrogenSemaphore.Release();
    }

    public void Oxygen(Action releaseOxygen)
    {
        oxygenSemaphore.Wait();
        releaseOxygen();
        barrier.SignalAndWait();
        oxygenSemaphore.Release();
    }
}
```

## Complexity

- **Time:** `O(1)` synchronization overhead per call.
- **Space:** `O(1)` for the semaphores and barrier.
