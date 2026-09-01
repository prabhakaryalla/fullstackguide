# 1320. Minimum Distance to Type a Word Using Two Fingers

**Difficulty:** Hard
**Category:** Dynamic Programming, String

## Problem

Given a 6-row keyboard layout containing `'A'`-`'Z'`, and a `word` to type using exactly two fingers, return the minimum total Manhattan distance traveled to type the whole word, starting with both fingers off the keyboard.

### Example

```
Input: word = "CAKE"
Output: 3
```

## Approach

Track the state `(index typed so far, position of the "other" finger)` — the finger that just typed the previous letter is always at that letter's position, so its position doesn't need to be stored separately. At each step, either move the finger that just typed to the next letter, or move the other, idle finger to it (which then becomes the "just typed" finger and frees up the previous position). Take the cheaper option at every state.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDistance(string word)
    {
        int n = word.Length;
        const int UNPLACED = 26;
        var dp = new int[n + 1, 27];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j < 27; j++)
                dp[i, j] = int.MaxValue / 2;

        dp[0, UNPLACED] = 0;

        for (int i = 0; i < n; i++)
        {
            int curPos = i == 0 ? UNPLACED : word[i - 1] - 'A';
            int target = word[i] - 'A';

            for (int other = 0; other < 27; other++)
            {
                if (dp[i, other] >= int.MaxValue / 2) continue;
                int cost = dp[i, other];

                int moveCurrent = curPos == UNPLACED ? 0 : Dist(curPos, target);
                if (cost + moveCurrent < dp[i + 1, other]) dp[i + 1, other] = cost + moveCurrent;

                int moveOther = other == UNPLACED ? 0 : Dist(other, target);
                if (cost + moveOther < dp[i + 1, curPos]) dp[i + 1, curPos] = cost + moveOther;
            }
        }

        int answer = int.MaxValue;
        for (int j = 0; j < 27; j++) answer = Math.Min(answer, dp[n, j]);
        return answer;
    }

    private int Dist(int a, int b)
    {
        int r1 = a / 6, c1 = a % 6, r2 = b / 6, c2 = b % 6;
        return Math.Abs(r1 - r2) + Math.Abs(c1 - c2);
    }
}
```

## Complexity

- **Time:** `O(n)` — 27 states per character.
- **Space:** `O(n)` for the DP table.
