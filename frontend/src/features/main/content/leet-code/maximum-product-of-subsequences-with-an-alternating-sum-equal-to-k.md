# 3509. Maximum Product of Subsequences With an Alternating Sum Equal to K

**Difficulty:** Hard
**Category:** Array, Hash Table, Dynamic Programming

## Problem
You are given an integer array `nums` and two integers `k` and `limit`. Find a non-empty subsequence of `nums` whose **alternating sum** (sum of elements at even positions within the subsequence minus the sum of elements at odd positions within the subsequence) equals `k`, and among all such subsequences, maximize the product of its elements without the product exceeding `limit`.

Return that maximum product, or -1 if no valid subsequence exists.

### Example
Input: `nums = [1, 2, 3]`, `k = 2`, `limit = 10`
Output: `6`
Explanation: The subsequence `[1, 2, 3]` has alternating sum `1 - 2 + 3 = 2` and product `6`, which is within the limit and is the best achievable.

## Approach
Use memoized recursion over the index `i`, a running "state" indicating whether the next chosen element would be added or subtracted (alternating starting with addition on the first chosen element), the running alternating sum so far (used as the adjusted remaining target), and the running product capped at `limit + 1` (since any product already exceeding the limit can never become valid, we clamp it to avoid unbounded growth in the memo key). At each index, we may skip the element (state unchanged) or take it (advancing the alternation state and updating the running sum/product). At the end of the array, a subsequence is valid if at least one element was taken, the alternating sum equals `k`, and the product is within `limit`.

## C# Solution

```csharp
public class Solution {
    private enum State { First, Subtract, Add }
    private const int MinValue = -5000;

    public int MaxProduct(int[] nums, int k, int limit) {
        long total = 0;
        foreach (int num in nums) total += num;
        if (Math.Abs(k) > total) return -1;

        var memo = new Dictionary<string, int>();
        int ans = Solve(nums, 0, 1, State.First, k, limit, memo);
        return ans == MinValue ? -1 : ans;
    }

    private int Solve(int[] nums, int i, int product, State state, int k, int limit, Dictionary<string, int> memo) {
        if (i == nums.Length)
            return (k == 0 && state != State.First && product <= limit) ? product : MinValue;

        string key = i + "_" + k + "_" + product + "_" + (int)state;
        if (memo.TryGetValue(key, out int cached)) return cached;

        int result = Solve(nums, i + 1, product, state, k, limit, memo);

        if (state == State.First)
            result = Math.Max(result, Solve(nums, i + 1, nums[i], State.Subtract, k - nums[i], limit, memo));
        if (state == State.Subtract)
            result = Math.Max(result, Solve(nums, i + 1, Math.Min(product * nums[i], limit + 1), State.Add, k + nums[i], limit, memo));
        if (state == State.Add)
            result = Math.Max(result, Solve(nums, i + 1, Math.Min(product * nums[i], limit + 1), State.Subtract, k - nums[i], limit, memo));

        memo[key] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(n * limit * K) in the bounded/memoized state space, where K is the range of achievable alternating sums
- **Space:** O(n * limit * K)
