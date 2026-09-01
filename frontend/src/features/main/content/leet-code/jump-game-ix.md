# 3660. Jump Game IX

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Monotonic Stack, Greedy

## Problem
You are given a 0-indexed integer array `nums`. From any index `i`, you may jump to the nearest index to the left with a strictly greater value, or to the nearest index to the right with a strictly greater value (whichever exist). Starting from each index `i`, you may take zero or more such jumps; return an array `answer` where `answer[i]` is the minimum value of `nums` reachable starting at index `i` (including `nums[i]` itself).

## Approach
Precompute, for every index `i`, `left[i]` = nearest index to the left with a strictly greater value, and `right[i]` = nearest index to the right with a strictly greater value, both computable in O(n) using monotonic stacks. Since both jump targets always have a value strictly greater than `nums[i]`, process indices in decreasing order of `nums` value: by the time we compute `answer[i]`, both `answer[left[i]]` and `answer[right[i]]` (if they exist) are already finalized, because their values are strictly larger and were therefore processed earlier. Set `answer[i] = min(nums[i], answer[left[i]] if exists, answer[right[i]] if exists)`.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinValueAfterJumps(int[] nums) 
    {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        Array.Fill(left, -1);
        Array.Fill(right, -1);

        var stack = new Stack<int>();
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && nums[stack.Peek()] <= nums[i]) stack.Pop();
            left[i] = stack.Count > 0 ? stack.Peek() : -1;
            stack.Push(i);
        }

        stack.Clear();
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && nums[stack.Peek()] <= nums[i]) stack.Pop();
            right[i] = stack.Count > 0 ? stack.Peek() : -1;
            stack.Push(i);
        }

        int[] answer = new int[n];
        var order = new int[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Array.Sort(order, (a, b) => nums[b].CompareTo(nums[a])); // descending by value

        for (int idx = 0; idx < n; idx++)
        {
            int i = order[idx];
            int best = nums[i];
            if (left[i] != -1) best = Math.Min(best, answer[left[i]]);
            if (right[i] != -1) best = Math.Min(best, answer[right[i]]);
            answer[i] = best;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
