# 3695. Maximize Alternating Sum Using Swaps

**Difficulty:** Hard
**Category:** Array, Greedy, Union-Find, Sorting

## Problem

You are given an integer array `nums`. The alternating sum of `nums` is `nums[0] - nums[1] + nums[2] - nums[3] + ...`.

You are also given a 2D integer array `swaps` where `swaps[i] = [p_i, q_i]` means you are allowed to swap the elements at indices `p_i` and `q_i`, any number of times, in any order.

Return the maximum possible alternating sum of `nums` after performing any sequence of allowed swaps.

### Example

```
Input: nums = [1,2,3], swaps = [[0,2],[1,2]]
Output: 4
Explanation: All three indices become interchangeable; placing the two largest values at even indices gives 2 - 1 + 3 = 4.
```

### Constraints

- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= swaps.length <= 10^5`

## Approach

Model the allowed swaps as edges of a graph over indices and find connected components with a disjoint-set union (DSU); all values within a component can be freely rearranged among the component's indices. Within each component, count how many of its indices are even (`E`), and place the `E` largest values of that component at those even indices (the rest go to odd indices) to maximize the component's contribution. If `sumAll` is the sum of the component's values and `sumTopE` is the sum of the largest `E` of them, the component's contribution to the alternating sum is `2 * sumTopE - sumAll`. Summing this over all components gives the answer.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public long MaximizeAlternatingSum(int[] nums, int[][] swaps)
    {
        int n = nums.Length;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        foreach (int[] swap in swaps)
        {
            Union(swap[0], swap[1]);
        }

        Dictionary<int, List<int>> components = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            int root = Find(i);
            if (!components.TryGetValue(root, out List<int> indices))
            {
                indices = new List<int>();
                components[root] = indices;
            }
            indices.Add(i);
        }

        long total = 0;

        foreach (List<int> component in components.Values)
        {
            int evenCount = 0;
            long sum = 0;
            List<int> values = new List<int>();

            foreach (int idx in component)
            {
                values.Add(nums[idx]);
                sum += nums[idx];
                if (idx % 2 == 0) evenCount++;
            }

            values.Sort();
            values.Reverse();

            long topSum = 0;
            for (int i = 0; i < evenCount; i++)
            {
                topSum += values[i];
            }

            total += 2 * topSum - sum;
        }

        return total;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
        {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA != rootB) parent[rootA] = rootB;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting values within components.
- **Space:** `O(n)`.
