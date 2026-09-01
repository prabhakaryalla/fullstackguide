# 41. First Missing Positive

**Difficulty:** Hard
**Category:** Array, Hash Table

## Problem

Given an unsorted integer array `nums`, return the smallest missing positive integer.

You must implement an algorithm that runs in `O(n)` time and uses `O(1)` auxiliary space.

### Example 1

```
Input: nums = [1,2,0]
Output: 3
```

```mermaid
graph LR
    A["1"] --- B["2"] --- C["0"]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
```

### Example 2

```
Input: nums = [3,4,-1,1]
Output: 2
```

### Example 3

```
Input: nums = [7,8,9,11,12]
Output: 1
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

The answer must be in `[1, n + 1]` where `n = nums.Length`. Use the array itself as a hash table: for each value `v` in range `[1, n]`, place it at index `v - 1` by repeatedly swapping (cyclic placement). Then scan the array — the first index `i` where `nums[i] != i + 1` gives the answer `i + 1`; if all match, the answer is `n + 1`.

## C# Solution

```csharp
public class Solution
{
    public int FirstMissingPositive(int[] nums)
    {
        int n = nums.Length;

        for (int i = 0; i < n; i++)
        {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
            {
                int target = nums[i] - 1;
                (nums[i], nums[target]) = (nums[target], nums[i]);
            }
        }

        for (int i = 0; i < n; i++)
        {
            if (nums[i] != i + 1) return i + 1;
        }

        return n + 1;
    }
}
```

## Complexity

- **Time:** `O(n)` — each value is swapped into place at most once.
- **Space:** `O(1)` — in-place, using the input array as storage.
