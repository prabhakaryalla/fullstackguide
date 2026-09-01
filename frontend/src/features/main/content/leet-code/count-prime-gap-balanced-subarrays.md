# 3589. Count Prime Gap Balanced Subarrays

**Difficulty:** Hard
**Category:** Array, Sliding Window, Number Theory, Monotonic Deque

## Problem
You are given an integer array `nums` and an integer `k`. A subarray is called **prime-gap balanced** if it contains at least one prime number and the difference between the largest and smallest prime values within it is at most `k`. Return the number of prime-gap balanced subarrays.

## Approach
Precompute primality up to the maximum value in `nums` with a sieve of Eratosthenes.

Use a sliding window with two monotonic deques tracking the maximum and minimum **prime** values currently in the window `[left, right]`. As `right` advances, the max-min gap among primes in the window only grows (or stays the same); when it exceeds `k`, advance `left` until the gap is valid again (or the window has no primes). Because shrinking the window can only decrease or keep the same the max-min gap, once `left` reaches the smallest valid position for a given `right`, every position from `left` up to the index of the **last prime seen so far** yields a valid, prime-gap balanced subarray ending at `right`. Sum these counts across all `right`.

## C# Solution

```csharp
public class Solution 
{
    public long CountPrimeGapBalanced(int[] nums, int k)
    {
        int n = nums.Length;
        int maxVal = 0;
        foreach (var x in nums) maxVal = Math.Max(maxVal, x);

        var isPrime = Sieve(maxVal);

        long count = 0;
        var maxDeque = new LinkedList<int>();
        var minDeque = new LinkedList<int>();
        int left = 0;
        int lastPrimeIdx = -1;

        for (int right = 0; right < n; right++)
        {
            if (nums[right] >= 2 && isPrime[nums[right]])
            {
                lastPrimeIdx = right;
                while (maxDeque.Count > 0 && nums[maxDeque.Last.Value] <= nums[right]) maxDeque.RemoveLast();
                maxDeque.AddLast(right);
                while (minDeque.Count > 0 && nums[minDeque.Last.Value] >= nums[right]) minDeque.RemoveLast();
                minDeque.AddLast(right);
            }

            while (maxDeque.Count > 0 && minDeque.Count > 0 &&
                   nums[maxDeque.First.Value] - nums[minDeque.First.Value] > k)
            {
                if (maxDeque.First.Value == left) maxDeque.RemoveFirst();
                if (minDeque.First.Value == left) minDeque.RemoveFirst();
                left++;
            }

            if (lastPrimeIdx >= left)
            {
                int upper = Math.Min(right, lastPrimeIdx);
                count += upper - left + 1;
            }
        }

        return count;
    }

    private bool[] Sieve(int max)
    {
        max = Math.Max(max, 2);
        var isComposite = new bool[max + 1];
        for (int i = 2; (long)i * i <= max; i++)
        {
            if (!isComposite[i])
            {
                for (int j = i * i; j <= max; j += i) isComposite[j] = true;
            }
        }
        var isPrime = new bool[max + 1];
        for (int i = 2; i <= max; i++) isPrime[i] = !isComposite[i];
        return isPrime;
    }
}
```

## Complexity

- **Time:** O(n log(max) + n) — sieve plus a linear two-pointer scan with amortized O(1) deque operations.
- **Space:** O(max + n)
