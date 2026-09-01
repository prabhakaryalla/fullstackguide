# 1601. Maximum Number of Achievable Transfer Requests

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Enumeration

## Problem

A building has `n` rooms numbered `0` to `n - 1`. Given `requests[i] = [fromi, toi]` meaning an employee wants to move from `fromi` to `toi`, the building is "achievable" if every room's net incoming transfers equal its net outgoing transfers (i.e., population per room stays the same). Return the maximum number of achievable requests that can be simultaneously satisfied.

### Example

```
Input: n = 5, requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]
Output: 5
Explanation: All requests except requests[3] = [3,4] can be satisfied.
```

## Approach

Since `requests.length <= 16`, enumerate every subset with bitmasking. For each mask, track the net degree change (outgoing minus incoming) per room; the subset is valid only if every room's net change is zero. Track the maximum popcount among valid masks.

## C# Solution

```csharp
public class Solution
{
    public int MaximumRequests(int n, int[][] requests)
    {
        int m = requests.Length;
        int best = 0;

        for (int mask = 0; mask < (1 << m); mask++)
        {
            int[] degree = new int[n];
            int count = 0;

            for (int i = 0; i < m; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    degree[requests[i][0]]--;
                    degree[requests[i][1]]++;
                    count++;
                }
            }

            if (count <= best)
            {
                continue;
            }

            bool balanced = true;
            foreach (int d in degree)
            {
                if (d != 0)
                {
                    balanced = false;
                    break;
                }
            }

            if (balanced)
            {
                best = count;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(2^m * (m + n))`, where `m` is the number of requests.
- **Space:** `O(n)` for the degree array.
