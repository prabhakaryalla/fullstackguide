# 3577. Count the Number of Computer Unlocking Permutations

**Difficulty:** Medium
**Category:** Array, Math, Brainteaser, Combinatorics

## Problem
You are given an array `complexity` of length `n`. There are `n` locked computers labeled 0 to `n - 1`, each with a password of complexity `complexity[i]`. Computer 0's password is already decrypted and serves as the root.

You can decrypt computer `i` using computer `j`'s password if `j < i` and `complexity[j] < complexity[i]`, provided computer `j` is already unlocked.

Find the number of permutations of `[0, 1, ..., n-1]` representing a valid order in which the computers can be unlocked, starting with computer 0 (already decrypted). Return the count modulo `10^9 + 7`.

### Example

```
Input: complexity = [1,2,3]
Output: 2
Explanation: [0,1,2] and [0,2,1] are both valid; computer 0 can always unlock 1 or 2 directly.
```

```
Input: complexity = [3,3,3,4,4,4]
Output: 0
Explanation: complexity[1] == complexity[0], so computer 1 can never be unlocked.
```

**Constraints:**
- `2 <= complexity.length <= 10^5`
- `1 <= complexity[i] <= 10^9`

## Approach
Computer 0 is always unlocked first (it's the only initially decrypted one). For any other computer `i`, since `0 < i` always holds, computer 0 alone is sufficient to unlock `i` as long as `complexity[0] < complexity[i]`. So if `complexity[0]` is strictly less than **every** other value in the array, every remaining computer can be unlocked via computer 0 regardless of the order chosen, giving `(n - 1)!` valid permutations. If any other computer shares or beats `complexity[0]`'s value, that computer (or the true minimum, wherever it lies) can never find a smaller-complexity, smaller-labeled predecessor, making the whole task impossible, so the answer is 0.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int CountPermutations(int[] complexity) 
    {
        int n = complexity.Length;
        for (int i = 1; i < n; i++)
        {
            if (complexity[i] <= complexity[0]) return 0;
        }

        long result = 1;
        for (int i = 2; i < n; i++)
        {
            result = result * i % MOD;
        }
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n), for the validity scan and factorial computation.
- **Space:** O(1).
