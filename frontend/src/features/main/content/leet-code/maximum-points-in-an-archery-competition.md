# 2212. Maximum Points in an Archery Competition

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Backtracking

## Problem

Alice and Bob are in an archery competition. Each round has `numArrows` arrows and targets labeled from `0` to `11` with varying scores.

Bob shoots first. You are given an array `aliceArrows` where `aliceArrows[i]` is the number of arrows Alice shot on the target with score `i`.

Bob has `numArrows` arrows to shoot. A target is won by whoever shot more arrows on it. If tied, Alice wins. Return an array of length 12 representing how Bob should shoot to maximize his score. If there are multiple ways, return any of them.

### Example

```
Input: numArrows = 9, aliceArrows = [1,1,0,1,0,0,2,1,0,1,2,0]
Output: [0,0,0,0,1,1,0,0,1,2,3,1]
Explanation: Bob can score 5+6+8+9+10+11 = 49 points.
```

## Approach

Use bitmask enumeration or backtracking to try all possible subsets of targets Bob can win. For each subset:
1. Calculate arrows needed to win those targets (Alice's arrows + 1 for each target)
2. If arrows needed <= numArrows, calculate Bob's score
3. Track the maximum score and corresponding arrow distribution
4. Remaining arrows can be placed on any target

## C# Solution

```csharp
public class Solution
{
    public int[] MaximumBobPoints(int numArrows, int[] aliceArrows)
    {
        int maxScore = 0;
        int[] bestDistribution = new int[12];
        
        // Try all possible subsets of targets (2^12 possibilities)
        for (int mask = 0; mask < (1 << 12); mask++)
        {
            int[] bobArrows = new int[12];
            int arrowsUsed = 0;
            int score = 0;
            
            for (int i = 0; i < 12; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    // Bob wins target i
                    bobArrows[i] = aliceArrows[i] + 1;
                    arrowsUsed += bobArrows[i];
                    score += i;
                }
            }
            
            if (arrowsUsed <= numArrows && score > maxScore)
            {
                maxScore = score;
                bestDistribution = (int[])bobArrows.Clone();
                // Put remaining arrows on any target
                bestDistribution[0] += numArrows - arrowsUsed;
            }
        }
        
        return bestDistribution;
    }
}
```

## Complexity

- **Time:** O(2^12 * 12) = O(49152), constant time
- **Space:** O(1), constant space for arrays
