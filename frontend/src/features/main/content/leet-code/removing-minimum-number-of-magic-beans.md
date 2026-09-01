# 2171. Removing Minimum Number of Magic Beans

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Prefix Sum

## Problem

You are given an array of positive integers `beans` where `beans[i]` represents the number of magic beans in the `i-th` bag.

Remove any number of beans (possibly zero) from each bag such that the number of beans in each bag is equal. Return the minimum number of beans you need to remove.

### Example

```
Input: beans = [4,1,6,5]
Output: 4
Explanation: Make all bags have 4 beans. Remove: 0 + 3 + 2 + 1 = 6? No.
Actually: We can make all bags have 1, 4, 5, or 6 beans.
- All have 1: remove 3+0+5+4 = 12
- All have 4: remove 0+3+2+1 = 6
- All have 5: remove 4+4+1+0 = 9
- All have 6: remove 4+5+0+1 = 10
Wait, if all have 4, we need bags: [4,4,4,4] from [4,1,6,5]
Remove: 0 + 3 + 2 + 1 = 6? But 6-4=2, 5-4=1, so 0+3+2+1=6. 

Actually for level 1: bags become [1,1,1,1], remove 3+0+5+4=12
For level 4: bags become [4,_,4,4] - can't make bag with 1 bean have 4!

I think we can only reduce, not increase. So target must be ≤ min(beans).
Actually, we remove beans to make equal, so we pick a target level and remove excess.
But some bags might have fewer beans than target - those become 0 (remove all).

Let me reconsider: "remove beans such that number in each bag is equal"
This means we can make some bags 0. So we pick a target, bags >= target become target, bags < target become 0.

For target=4: [4,0,4,4], remove 0+1+2+1=4
For target=5: [0,0,5,5], remove 4+1+1+0=6
For target=1: [1,1,1,1], remove 3+0+5+4=12

So answer is 4.
```

## Approach

Sort the array. For each possible target value (which must be one of the existing bag counts), calculate how many beans to remove:
- Bags with fewer beans than target: remove all
- Bags with more beans: remove excess

For efficiency, use the insight that if we choose `beans[i]` as the target, all bags from `i` onwards can have this many beans, and all before are set to 0.

Cost = (total beans) - (number of remaining bags) * (target level)

## C# Solution

```csharp
public class Solution
{
    public long MinimumRemoval(int[] beans)
    {
        Array.Sort(beans);
        long totalBeans = beans.Sum(x => (long)x);
        long minRemoval = long.MaxValue;
        int n = beans.Length;
        
        for (int i = 0; i < n; i++)
        {
            // Set this level as target for all bags from i onwards
            long target = beans[i];
            long remaining = (n - i) * target;
            long removal = totalBeans - remaining;
            
            minRemoval = Math.Min(minRemoval, removal);
        }
        
        return minRemoval;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1)
