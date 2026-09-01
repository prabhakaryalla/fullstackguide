# 42. Trapping Rain Water

**Difficulty:** Hard
**Category:** Array, Two Pointers, Dynamic Programming, Stack

## Problem

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Example 1

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

```mermaid
graph LR
    A["0"] --- B["1"] --- C["0"] --- D["2"] --- E["1"] --- F["0"] --- G["1"] --- H["3"] --- I["2"] --- J["1"] --- K["2"] --- L["1"]
    style D fill:#4caf50,color:#fff
    style H fill:#4caf50,color:#fff
    style K fill:#4caf50,color:#fff
```

### Example 2

```
Input: height = [4,2,0,3,2,5]
Output: 9
```

### Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Approach

Use two pointers starting at both ends, tracking the maximum wall height seen so far from the left (`leftMax`) and from the right (`rightMax`). At each step, move the pointer on the side with the smaller max — the water trapped above that bar is `min(leftMax, rightMax) - height[pointer]`, because the shorter side's max is always the true limiting wall.

## C# Solution

```csharp
public class Solution
{
    public int Trap(int[] height)
    {
        int left = 0, right = height.Length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right)
        {
            if (height[left] < height[right])
            {
                leftMax = Math.Max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            }
            else
            {
                rightMax = Math.Max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }

        return water;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass with two pointers.
- **Space:** `O(1)`.
