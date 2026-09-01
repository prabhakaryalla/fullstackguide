# 1505. Minimum Possible Integer After at Most K Adjacent Swaps On Digits

**Difficulty:** Hard
**Category:** String, Greedy, Binary Indexed Tree, Segment Tree

## Problem

Given a string `num` representing a large integer and an integer `k`, return the minimum integer (as a string) that results from at most `k` adjacent digit swaps.

### Example

```
Input: num = "4321", k = 4
Output: "1342"
```

## Approach

Greedily build the result digit by digit. For each output position, scan digits `0`-`9` and find the closest occurrence (to the current front) of the smallest available digit that can be moved to the front within the remaining swap budget `k`. The number of swaps needed to move a digit at (original) index `idx` to the current front equals the number of not-yet-used digits before it — this count is maintained efficiently with a Binary Indexed Tree (Fenwick tree) over "still available" positions, so it can be queried/updated in `O(log n)`.

## C# Solution

```csharp
public class Solution
{
    public string MinInteger(string num, int k)
    {
        int n = num.Length;
        var positions = new List<int>[10];
        for (int d = 0; d < 10; d++)
        {
            positions[d] = new List<int>();
        }
        for (int i = 0; i < n; i++)
        {
            positions[num[i] - '0'].Add(i);
        }

        var pointer = new int[10];
        var bit = new int[n + 1];

        void Update(int i)
        {
            for (i++; i <= n; i += i & (-i))
            {
                bit[i]++;
            }
        }

        int Query(int i)
        {
            int sum = 0;
            for (i++; i > 0; i -= i & (-i))
            {
                sum += bit[i];
            }
            return sum;
        }

        var used = new bool[n];
        var result = new char[n];

        for (int pos = 0; pos < n; pos++)
        {
            for (int d = 0; d <= 9; d++)
            {
                if (pointer[d] >= positions[d].Count)
                {
                    continue;
                }

                int idx = positions[d][pointer[d]];
                int swapsNeeded = idx - Query(idx);

                if (swapsNeeded <= k)
                {
                    k -= swapsNeeded;
                    used[idx] = true;
                    Update(idx);
                    pointer[d]++;
                    result[pos] = (char)('0' + d);
                    break;
                }
            }
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n log n)` — each of the `n` output positions performs a constant number of BIT queries/updates in `O(log n)`.
- **Space:** `O(n)` for the BIT, position lists, and result buffer.
