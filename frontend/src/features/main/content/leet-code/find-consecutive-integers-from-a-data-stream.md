# 2526. Find Consecutive Integers from a Data Stream

**Difficulty:** Medium
**Category:** Design, Queue, Hash Table, Counting, Data Stream

## Problem

Implement the `DataStream` class:
- `DataStream(int value, int k)` Initializes the object with an integer `value` and an integer `k`
- `boolean consec(int num)` Returns `true` if the last `k` integers in the stream are all equal to `value`, otherwise returns `false`

### Example

```
Input: ["DataStream", "consec", "consec", "consec", "consec"]
       [[4, 3], [4], [4], [4], [3]]
Output: [null, false, false, true, false]
Explanation: 
After consec(4), consec(4), consec(4), we have 3 consecutive 4's, so return true.
After consec(3), the last 3 are [4, 4, 3], not all 4's, so return false.
```

## Approach

Keep a counter of consecutive occurrences of the target value. When a number matching the value is added, increment the counter. When a different number is added, reset the counter to 0. Return true when the counter reaches k.

## C# Solution

```csharp
public class DataStream
{
    private int value;
    private int k;
    private int consecutiveCount;
    
    public DataStream(int value, int k)
    {
        this.value = value;
        this.k = k;
        this.consecutiveCount = 0;
    }
    
    public bool Consec(int num)
    {
        if (num == value)
        {
            consecutiveCount++;
        }
        else
        {
            consecutiveCount = 0;
        }
        
        return consecutiveCount >= k;
    }
}
```

## Complexity

- **Time:** O(1) per operation
- **Space:** O(1)
