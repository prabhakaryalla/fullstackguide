# 3679. Minimum Discards to Balance Inventory

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window, Simulation, Counting

## Problem

You are given two integers `w` and `m`, and an integer array `arrivals`, where `arrivals[i]` is the type of item arriving on day `i`.

Each arrival may be kept or discarded (an item can only be discarded on its arrival day). For each day `i`, consider the window of the `w` most recent days ending at `i`. Within that window, each item type may appear at most `m` times among **kept** arrivals. If keeping the arrival on day `i` would cause its type to exceed `m` occurrences in the window, that arrival must be discarded.

Return the minimum number of arrivals that must be discarded so that every `w`-day window contains at most `m` occurrences of each type.

### Example

```
Input: arrivals = [1,2,3,3,3,4], w = 3, m = 2
Output: 1
Explanation: The third occurrence of type 3 within a 3-day window (days 3-5) must be discarded.
```

### Constraints

- `1 <= arrivals.length <= 10^5`
- `1 <= arrivals[i] <= 10^5`
- `1 <= w <= arrivals.length`
- `1 <= m <= w`

## Approach

Use a sliding window of size `w` over the days. Maintain a hash map of counts for each type among the *kept* arrivals currently inside the window, and a boolean array tracking whether each day's arrival was kept. When the window grows past size `w`, shrink it from the left, decrementing the count only for days that were actually kept. For each new day, tentatively increment its type's count; if that would exceed `m`, discard the arrival (leave the count unchanged and mark it as not kept); otherwise keep it and commit the incremented count.

## C# Solution

```csharp
public class Solution
{
    public int MinDiscards(int[] arrivals, int w, int m)
    {
        int n = arrivals.Length;
        bool[] kept = new bool[n];
        Dictionary<int, int> count = new Dictionary<int, int>();
        int left = 0;
        int discarded = 0;

        for (int right = 0; right < n; right++)
        {
            while (right - left + 1 > w)
            {
                if (kept[left])
                {
                    count[arrivals[left]]--;
                }
                left++;
            }

            int type = arrivals[right];
            count.TryGetValue(type, out int current);

            if (current + 1 > m)
            {
                discarded++;
                kept[right] = false;
            }
            else
            {
                count[type] = current + 1;
                kept[right] = true;
            }
        }

        return discarded;
    }
}
```

## Complexity

- **Time:** `O(n)` — each day enters and leaves the window at most once.
- **Space:** `O(min(n, maxType))` for the count map and the kept array.
