# 1010. Pairs of Songs With Total Durations Divisible by 60

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem

Given a list of song durations `time`, return the number of pairs of songs whose total duration in seconds is divisible by `60`.

### Example

```
Input: time = [30,20,150,100,40]
Output: 3
```

## Approach

Only each duration's remainder modulo `60` matters. Keep a count of how many songs seen so far have each remainder `0..59`. For each new duration, its complementary remainder is `(60 - remainder) % 60` (handling the `remainder == 0` case); add however many previously-seen songs have that complementary remainder to the answer, then record the current song's remainder for future pairs.

## C# Solution

```csharp
public class Solution
{
    public int NumPairsDivisibleBy60(int[] time)
    {
        int[] remainderCount = new int[60];
        int pairs = 0;

        foreach (var t in time)
        {
            int remainder = t % 60;
            int complement = (60 - remainder) % 60;
            pairs += remainderCount[complement];
            remainderCount[remainder]++;
        }

        return pairs;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the durations.
- **Space:** `O(1)` — fixed-size 60-element array.
