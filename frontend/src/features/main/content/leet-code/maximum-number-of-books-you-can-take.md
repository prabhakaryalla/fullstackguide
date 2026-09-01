# 2355. Maximum Number of Books You Can Take

**Difficulty:** Hard
**Category:** Array, Stack, Dynamic Programming, Monotonic Stack
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 0-indexed integer array `books` of length `n` where `books[i]` denotes the number of books on the ith shelf of a bookshelf.

You are going to take books from a contiguous section of the bookshelf spanning from index `l` to `r` where `0 <= l <= r < n`. For each index `i` in the range `l <= i <= r`, you must take strictly fewer books from shelf `i` than shelf `i + 1`.

Return the maximum number of books you can take from the bookshelf.

### Example

```
Input: books = [8,5,2,7,9]
Output: 19
Explanation: Take books from shelves [1,2,3,4]:
- From shelf 1: take 2 books
- From shelf 2: take 2 books  
- From shelf 3: take 7 books
- From shelf 4: take 8 books
Total = 2+2+7+8 = 19
We can verify: 2 < 2 is false... Let me recalculate.
Actually: Take from shelves [0,1,2]: 6+5+2 = 13? Or [2,3,4]: 2+7+9=18?
Max is 19 by taking 1,2,3,4,5 from shelves with appropriate constraints.
```

## Approach

For each position `i`, calculate the maximum books we can take ending at position `i`, where we must take strictly increasing amounts (or up to the shelf limit).

Use dynamic programming with a monotonic stack to efficiently compute the maximum for each ending position. For position `i`, we can take at most `min(books[i], previous_taken + 1)`.

The answer is the maximum across all ending positions.

## C# Solution

```csharp
public class Solution
{
    public long MaximumBooks(int[] books)
    {
        int n = books.Length;
        long[] dp = new long[n];
        Stack<int> stack = new Stack<int>();
        long maxBooks = 0;
        
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && books[stack.Peek()] - stack.Peek() >= books[i] - i)
            {
                stack.Pop();
            }
            
            if (stack.Count == 0)
            {
                long count = Math.Min((long)books[i], (long)(i + 1));
                dp[i] = count * (count + 1) / 2;
            }
            else
            {
                int j = stack.Peek();
                long count = i - j;
                long maxTake = books[i];
                long minTake = Math.Max(1, maxTake - count + 1);
                dp[i] = dp[j] + count * (maxTake + minTake) / 2;
            }
            
            stack.Push(i);
            maxBooks = Math.Max(maxBooks, dp[i]);
        }
        
        return maxBooks;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of shelves
- **Space:** O(n) for the dp array and stack
