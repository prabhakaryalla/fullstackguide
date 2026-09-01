# 3638. Maximum Balanced Shipments

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Boxes are processed left to right in a shipment. A shipment is "balanced" as long as no box's weight is smaller than the maximum weight already seen in that shipment; once a smaller-weight box appears, a new shipment must begin. Return the maximum number of shipments that result from partitioning `weight` this way.

### Example

`weight = [2,5,4,8,6]`: shipment 1 = `[2,5]` (weights non-decreasing so far, then 4 < 5 breaks it), shipment 2 = `[4,8]` (6 < 8 breaks it), shipment 3 = `[6]`. Total = 3.

## Approach

Greedily scan left to right tracking the running maximum weight of the current shipment. Whenever the next box's weight is smaller than that running maximum, start a new shipment (reset the max); otherwise extend the current shipment and update the max.

## C# Solution

```csharp
public class Solution 
{
    public int MaxBalancedShipments(int[] weight) 
    {
        int shipments = 1;
        int currentMax = weight[0];

        for (int i = 1; i < weight.Length; i++) 
        {
            if (weight[i] < currentMax) 
            {
                shipments++;
                currentMax = weight[i];
            } 
            else 
            {
                currentMax = Math.Max(currentMax, weight[i]);
            }
        }
        return shipments;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
