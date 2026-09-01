# 948. Bag of Tokens

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy, Sorting

## Problem

Given an array of token values and a starting `power`, you may repeatedly either spend `power` equal to a token's value to gain 1 score (face up), or spend 1 score to gain `power` equal to a token's value (face down), each token usable once. Return the maximum score achievable.

### Example

```
Input: tokens = [100,200,300,400], power = 200
Output: 2
```

## Approach

Sort the tokens. Greedily play the cheapest remaining token face-up whenever affordable (gaining score), and whenever unaffordable but a score is banked, play the most expensive remaining token face-down (trading a score for power) to enable further cheap plays. Track the best score seen at any point, since playing a token face-down alone never directly improves the running maximum but can enable more face-up plays.

## C# Solution

```csharp
public class Solution
{
    public int BagOfTokensScore(int[] tokens, int power)
    {
        Array.Sort(tokens);
        int left = 0, right = tokens.Length - 1;
        int score = 0, maxScore = 0;

        while (left <= right)
        {
            if (power >= tokens[left])
            {
                power -= tokens[left++];
                score++;
                maxScore = Math.Max(maxScore, score);
            }
            else if (score > 0 && left < right)
            {
                power += tokens[right--];
                score--;
            }
            else break;
        }

        return maxScore;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra.
