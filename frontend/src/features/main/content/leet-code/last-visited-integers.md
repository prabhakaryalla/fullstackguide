# 2899. Last Visited Integers

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a list of strings `words` where each string is either:
- A positive integer represented as a string
- The string "prev"

Initially, you have an empty list `nums` and a variable `k = 0`.

Process each word:
- If the word is an integer, append it to `nums` and reset `k = 0`
- If the word is "prev", increment `k` by 1, then:
  - If `k <= nums.length`, append `nums[nums.length - k]` to the answer
  - Otherwise, append -1 to the answer

Return the resulting array of integers.

### Example

```
Input: words = ["1","2","prev","prev","prev"]
Output: [2,1,-1]
Explanation:
- "1": nums = [1], k = 0
- "2": nums = [1,2], k = 0
- "prev": k = 1, nums[2-1] = 2, answer = [2]
- "prev": k = 2, nums[2-2] = 1, answer = [2,1]
- "prev": k = 3, k > nums.length, answer = [2,1,-1]
```

## Approach

Maintain a list `nums` to store visited integers and a counter `k`. For each word, if it's a number, parse and append to `nums` and reset `k`. If it's "prev", increment `k` and compute the appropriate index or append -1.

## C# Solution

```csharp
public class Solution
{
    public int[] LastVisitedIntegers(string[] words)
    {
        var nums = new List<int>();
        var result = new List<int>();
        int k = 0;
        
        foreach (string word in words)
        {
            if (word == "prev")
            {
                k++;
                if (k <= nums.Count)
                    result.Add(nums[nums.Count - k]);
                else
                    result.Add(-1);
            }
            else
            {
                nums.Add(int.Parse(word));
                k = 0;
            }
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the number of words.
- **Space:** `O(n)` for storing nums and result.
