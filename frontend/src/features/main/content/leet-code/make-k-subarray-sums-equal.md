# 2607. Make K-Subarray Sums Equal

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem

You are given a 0-indexed integer array `arr` and an integer `k`. The array `arr` is circular. In one operation, you can do the following:

- Choose an index `i` and increase or decrease `arr[i]` by `1`.

Return the minimum number of operations such that the sum of each subarray of length `k` is equal.

### Example

```
Input: arr = [1,4,1,3], k = 2
Output: 1
Explanation: We can change arr[1] to 3, so arr becomes [1,3,1,3].
All subarrays of length 2 have sum 4.
```

## Approach

For all subarrays of length `k` to have equal sum, elements at indices `i` and `i + k` (mod `n`) must be equal. Group indices by their equivalence class under modulo `gcd(n, k)`. For each group, the optimal target is the median, and the cost is the sum of absolute differences from the median.

## C# Solution

```csharp
public class Solution
{
    public long MakeSubKSumEqual(int[] arr, int k)
    {
        int n = arr.Length;
        int g = GCD(n, k);
        long totalOps = 0;
        
        for (int start = 0; start < g; start++)
        {
            var group = new List<int>();
            for (int i = start; i < n; i += g)
                group.Add(arr[i]);
            
            group.Sort();
            int median = group[group.Count / 2];
            
            foreach (int val in group)
                totalOps += Math.Abs(val - median);
        }
        
        return totalOps;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n log n) — sorting each group
- **Space:** O(n) — storing groups
