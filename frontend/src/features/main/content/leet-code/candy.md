# 135. Candy

**Difficulty:** Hard
**Category:** Array, Greedy

## Problem

There are `n` children standing in a line, each assigned a `rating` value. You are giving out candies to these children subject to: every child must get at least one candy, and any child with a higher rating than an immediate neighbor must get more candies than that neighbor. Return the minimum number of candies needed.

### Example 1

```
Input: ratings = [1,0,2]
Output: 5
Explanation: candies = [2,1,2].
```

### Example 2

```
Input: ratings = [1,2,2]
Output: 4
Explanation: candies = [1,2,1]. The third child gets 1 candy because it satisfies the requirements (its rating equals, not exceeds, the second child's).
```

### Constraints

- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

## Approach

Two greedy passes suffice: initialize every child to 1 candy. Scan left to right, giving a child one more candy than its left neighbor whenever its rating is higher. Then scan right to left, taking the max of the child's current candy count and one more than its right neighbor's count whenever its rating is higher than the right neighbor's. Both directional constraints end up satisfied simultaneously.

## C# Solution

```csharp
public class Solution
{
    public int Candy(int[] ratings)
    {
        int n = ratings.Length;
        var candies = new int[n];
        Array.Fill(candies, 1);

        for (int i = 1; i < n; i++)
        {
            if (ratings[i] > ratings[i - 1])
            {
                candies[i] = candies[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--)
        {
            if (ratings[i] > ratings[i + 1])
            {
                candies[i] = Math.Max(candies[i], candies[i + 1] + 1);
            }
        }

        int total = 0;
        foreach (int candy in candies) total += candy;
        return total;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(n)` — for the candies array.
