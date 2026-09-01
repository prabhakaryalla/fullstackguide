# 3277. Maximum XOR Score Subarray Queries

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem

The XOR score of an array is computed by repeatedly replacing the array with a new array where each element is the XOR of two adjacent elements, until only one element remains; that final value is the score. You are given an array `nums` and a list of `queries`, where `queries[i] = [li, ri]`. For each query, return the maximum XOR score among all subarrays of `nums[li..ri]`.

### Example

```
Input: nums = [2,8,4,32,16,1], queries = [[0,2],[1,4],[0,5]]
Output: [12,60,60]
```

## Approach

Define `score[i][j]` as the XOR score of the subarray `nums[i..j]`. This satisfies the recurrence `score[i][j] = score[i][j-1] XOR score[i+1][j]` (a fold identity similar to Pascal's triangle), with `score[i][i] = nums[i]`. Additionally define `maxScore[i][j]` as the best XOR score of any subarray within `nums[i..j]`, computed as `max(score[i][j], maxScore[i+1][j], maxScore[i][j-1])`. Both tables can be filled in increasing order of subarray length in O(n^2). Each query is then answered in O(1) by looking up `maxScore[l][r]`.

## C# Solution

```csharp
public class Solution 
{
    public int[] MaximumSubarrayXor(int[] nums, int[][] queries) 
    {
        int n = nums.Length;
        int[,] score = new int[n, n];
        int[,] maxScore = new int[n, n];

        for (int i = 0; i < n; i++) 
        {
            score[i, i] = nums[i];
            maxScore[i, i] = nums[i];
        }

        for (int len = 2; len <= n; len++) 
        {
            for (int i = 0; i + len - 1 < n; i++) 
            {
                int j = i + len - 1;
                score[i, j] = score[i, j - 1] ^ score[i + 1, j];

                int best = score[i, j];
                if (maxScore[i + 1, j] > best) best = maxScore[i + 1, j];
                if (maxScore[i, j - 1] > best) best = maxScore[i, j - 1];
                maxScore[i, j] = best;
            }
        }

        int q = queries.Length;
        int[] answer = new int[q];
        for (int idx = 0; idx < q; idx++) 
        {
            int l = queries[idx][0];
            int r = queries[idx][1];
            answer[idx] = maxScore[l, r];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n^2 + q)
- **Space:** O(n^2)
