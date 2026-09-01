# 2513. Minimize the Maximum of Two Arrays

**Difficulty:** Medium
**Category:** Math, Binary Search, Number Theory

## Problem

We have two arrays `arr1` and `arr2` that are initially empty. You need to add positive integers to them such that:
- `arr1` contains `uniqueCnt1` distinct positive integers, each of which is not divisible by `divisor1`
- `arr2` contains `uniqueCnt2` distinct positive integers, each of which is not divisible by `divisor2`
- No integer is present in both `arr1` and `arr2`

Return the minimum possible maximum integer that can be present in either array.

### Example

```
Input: divisor1 = 2, divisor2 = 7, uniqueCnt1 = 1, uniqueCnt2 = 3
Output: 4
Explanation: arr1 = [1], arr2 = [3, 5, 7]. The maximum value is 7, but we can do better: arr1 = [3], arr2 = [1, 5, 7], max = 7. Actually optimal is arr1 = [1], arr2 = [3, 5, 7], max = 7... Let me reconsider: arr1 can be [1], arr2 can be [3] and we need one more element not divisible by 7 which is 4.
Actually the answer is 4.
```

## Approach

Use binary search on the answer. For a given maximum value `mid`, calculate how many integers up to `mid` are not divisible by `divisor1`, not divisible by `divisor2`, and not divisible by both. Check if we can fill both arrays without overlap. The LCM of divisor1 and divisor2 helps count numbers divisible by both.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2)
    {
        long left = 1, right = (long)2e10;
        long lcm = LCM(divisor1, divisor2);
        
        while (left < right)
        {
            long mid = left + (right - left) / 2;
            
            long notDiv1 = mid - mid / divisor1;
            long notDiv2 = mid - mid / divisor2;
            long notDivBoth = mid - mid / lcm;
            
            if (notDiv1 >= uniqueCnt1 && notDiv2 >= uniqueCnt2 && 
                notDivBoth >= uniqueCnt1 + uniqueCnt2)
            {
                right = mid;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return (int)left;
    }
    
    private long GCD(long a, long b)
    {
        return b == 0 ? a : GCD(b, a % b);
    }
    
    private long LCM(long a, long b)
    {
        return a / GCD(a, b) * b;
    }
}
```

## Complexity

- **Time:** O(log(max_value))
- **Space:** O(1)
