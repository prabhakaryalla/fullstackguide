# 2155. All Divisions With the Highest Score of a Binary Array

**Difficulty:** Medium
**Category:** Array

## Problem

You are given a 0-indexed binary array `nums` of length `n`. `nums` can be divided at index `i` (0 ≤ i ≤ n) into two arrays:
- `nums_left`: [0, i-1]
- `nums_right`: [i, n-1]

The score of a division is the number of 0's in `nums_left` plus the number of 1's in `nums_right`.

Return all distinct indices with the highest possible score.

### Example

```
Input: nums = [0,0,1,0]
Output: [2,4]
Explanation: 
- Division at index 2: [0,0] | [1,0] -> score = 2 + 1 = 3
- Division at index 4: [0,0,1,0] | [] -> score = 3 + 0 = 3
```

## Approach

Calculate the score for each possible division point efficiently:
1. Precompute total number of 1's (this will be the score at index 0)
2. As we move the division point right:
   - If we pass a 0, add 1 to score (one more 0 in left part)
   - If we pass a 1, subtract 1 from score (one fewer 1 in right part)
3. Track maximum score and all indices achieving it

## C# Solution

```csharp
public class Solution
{
    public IList<int> MaxScoreIndices(int[] nums)
    {
        int n = nums.Length;
        
        // Initial score at index 0: all 1's are on the right
        int score = nums.Count(x => x == 1);
        int maxScore = score;
        var result = new List<int> { 0 };
        
        for (int i = 0; i < n; i++)
        {
            // Moving division point from i to i+1
            if (nums[i] == 0)
                score++; // One more 0 in left
            else
                score--; // One fewer 1 in right
            
            if (score > maxScore)
            {
                maxScore = score;
                result.Clear();
                result.Add(i + 1);
            }
            else if (score == maxScore)
            {
                result.Add(i + 1);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1) excluding the result list
