# 2086. Minimum Number of Buckets Required to Collect Rainwater from Houses

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

Given a string `street` where `'H'` marks a house and `'.'` marks an empty space, place the minimum number of water buckets in empty spaces so that every house has a bucket in an **adjacent** empty space (a bucket can serve at most two houses, one on each side). Return the minimum number of buckets needed, or `-1` if it's impossible (e.g., two houses directly next to each other with no gap).

## Approach

Scan left to right. Whenever a house is found:
- If the position immediately after it is empty (and within bounds), place a bucket there (letting it also potentially serve the *next* house later), and skip past that position, since it's now occupied.
- Otherwise, if the position immediately before it is empty, place a bucket there instead.
- If neither adjacent position is available (both are houses or already used, or off the edge of the street), it's impossible — return `-1`.

Preferring to place the bucket **after** the house (when possible) is the key greedy insight, since it gives that same bucket a chance to also cover the next house if it turns out to be adjacent, minimizing total buckets used.

## C# Solution

```csharp
public class Solution
{
    public int MinimumBuckets(string street)
    {
        var chars = street.ToCharArray();
        int n = chars.Length;
        int buckets = 0;

        for (int i = 0; i < n; i++)
        {
            if (chars[i] != 'H') continue;

            if (i + 1 < n && chars[i + 1] == '.')
            {
                chars[i + 1] = 'B';
                buckets++;
            }
            else if (i - 1 >= 0 && chars[i - 1] == '.')
            {
                chars[i - 1] = 'B';
                buckets++;
            }
            else
            {
                return -1;
            }
        }

        return buckets;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the mutable character array.
