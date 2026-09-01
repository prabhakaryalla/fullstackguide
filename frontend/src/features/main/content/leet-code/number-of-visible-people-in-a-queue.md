# 1944. Number of Visible People in a Queue

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack

## Problem

`n` people stand in a queue with heights `heights[i]`, all distinct. Person `i` can see person `j` (`j > i`) if everyone between them is shorter than both `heights[i]` and `heights[j]` (person `i` can see over shorter people until blocked by someone at least as tall, and can see that blocking person too if they are taller). Return an array `answer` where `answer[i]` is the number of people person `i` can see to their right.

### Example

```
Input: heights = [10,6,8,5,11,9]
Output: [3,1,2,1,1,0]
Explanation: Person 0 (10) sees person 1 (6), person 2 (8), and person 4 (11) [11 blocks further view] = 3 people.
```

### Constraints

- `n == heights.length`
- `1 <= n <= 10^5`
- `1 <= heights[i] <= 10^5`
- All values are distinct.

## Approach

Process the array from right to left using a monotonic decreasing stack of heights. For person `i`, pop all stack entries shorter than `heights[i]` (each popped person is visible), incrementing the visible count for each pop; if the stack becomes empty, all popped people were visible and there's no one taller blocking further; if the stack is non-empty after popping, the remaining top (taller or equal — but all distinct so strictly taller) is also visible (one more), since it's the first one that blocks the view. Push `heights[i]` onto the stack afterward.

## C# Solution

```csharp
public class Solution
{
    public int[] CanSeePersonsCount(int[] heights)
    {
        int n = heights.Length;
        int[] answer = new int[n];
        var stack = new Stack<int>();

        for (int i = n - 1; i >= 0; i--)
        {
            int count = 0;
            while (stack.Count > 0 && stack.Peek() < heights[i])
            {
                stack.Pop();
                count++;
            }

            if (stack.Count > 0)
            {
                count++;
            }

            answer[i] = count;
            stack.Push(heights[i]);
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element is pushed and popped at most once.
- **Space:** `O(n)` for the stack and output array.
