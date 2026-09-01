# 1226. The Dining Philosophers

**Difficulty:** Medium
**Category:** Concurrency

## Problem

Five philosophers sit around a circular table with one fork between each adjacent pair. To eat, a philosopher needs both their left and right fork. Implement `DiningPhilosophers` with a `wantsToEat` method that invokes the given action callbacks (`pickLeftFork`, `pickRightFork`, `eat`, `putLeftFork`, `putRightFork`) in a way that lets multiple philosophers eat concurrently without deadlock or starvation.

## Approach

Deadlock in the classic dining philosophers setup happens when every philosopher simultaneously grabs their left fork and waits forever for their right one. Guarding entry with a counting semaphore that allows at most `4` of the `5` philosophers to attempt picking up forks at once breaks that circular wait — with only 4 active, at least one philosopher can always acquire both forks. Each fork is additionally protected by its own binary semaphore (mutex) to serialize access between the two philosophers who share it.

## C# Solution

```csharp
public class DiningPhilosophers
{
    private readonly SemaphoreSlim[] forks;
    private readonly SemaphoreSlim tableLimiter;

    public DiningPhilosophers()
    {
        forks = new SemaphoreSlim[5];
        for (int i = 0; i < 5; i++)
            forks[i] = new SemaphoreSlim(1, 1);

        tableLimiter = new SemaphoreSlim(4, 4);
    }

    public void WantsToEat(int philosopher,
                           Action pickLeftFork, Action pickRightFork,
                           Action eat,
                           Action putLeftFork, Action putRightFork)
    {
        int left = philosopher;
        int right = (philosopher + 4) % 5;

        tableLimiter.Wait();
        forks[left].Wait();
        forks[right].Wait();

        pickLeftFork();
        pickRightFork();
        eat();
        putLeftFork();
        putRightFork();

        forks[left].Release();
        forks[right].Release();
        tableLimiter.Release();
    }
}
```

## Complexity

- **Time:** `O(1)` synchronization overhead per call (excluding time spent blocked waiting).
- **Space:** `O(1)` — a fixed number of semaphores regardless of call volume.
