# 3377. Digit Operations to Make Two Integers Equal

**Difficulty:** Medium
**Category:** Graph, Dijkstra, Math, Number Theory

## Problem

Given `n1` and `n2` with the same number of digits, in one operation increment or decrement a single digit of `n1` by 1 (no leading zero, and the resulting number must not be prime). Return the minimum number of operations to transform `n1` into `n2`, or `-1` if impossible.

### Example

Input: `n1 = 3`, `n2 = 7`
Output: shortest path avoiding intermediate primes while changing digits one step at a time.

## Approach

Model each integer value as a graph node; edges connect a value to another obtained by changing one digit by ±1 (skipping values that are prime or have a leading zero). Run Dijkstra/0-1 BFS from `n1` to `n2` since all edges have weight 1.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int n1, int n2) 
    {
        int limit = Math.Max(n1, n2) * 10 + 10;
        bool[] isPrime = SieveComposite(limit);

        var dist = new Dictionary<int, int>();
        var queue = new Queue<int>();
        dist[n1] = 0;
        queue.Enqueue(n1);

        while (queue.Count > 0) 
        {
            int cur = queue.Dequeue();
            if (cur == n2) return dist[cur];

            var digits = cur.ToString().ToCharArray();
            for (int i = 0; i < digits.Length; i++) 
            {
                for (int delta = -1; delta <= 1; delta += 2) 
                {
                    int d = (digits[i] - '0') + delta;
                    if (d < 0 || d > 9) continue;
                    if (d == 0 && i == 0 && digits.Length > 1) continue;

                    var copy = (char[])digits.Clone();
                    copy[i] = (char)('0' + d);
                    int next = int.Parse(new string(copy));
                    if (next <= limit && !isPrime[next] && !dist.ContainsKey(next)) 
                    {
                        dist[next] = dist[cur] + 1;
                        queue.Enqueue(next);
                    }
                }
            }
        }
        return dist.ContainsKey(n2) ? dist[n2] : -1;
    }

    private bool[] SieveComposite(int limit) 
    {
        bool[] isPrime = new bool[limit + 1];
        if (limit >= 2) Array.Fill(isPrime, true, 2, limit - 1);
        for (int i = 2; (long)i * i <= limit; i++)
            if (isPrime[i])
                for (int j = i * i; j <= limit; j += i)
                    isPrime[j] = false;
        return isPrime;
    }
}
```

## Complexity

- **Time:** O(V * digits) where V is the number of reachable values
- **Space:** O(V)
