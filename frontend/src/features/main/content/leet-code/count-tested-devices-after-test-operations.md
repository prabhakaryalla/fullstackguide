# 2960. Count Tested Devices After Test Operations

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You have `n` devices with battery percentages given in array `batteryPercentages`. You test devices from left to right. When testing device `i`:
- If `batteryPercentages[i] > 0`, the device is tested and the battery of all devices with index `> i` decreases by 1 (minimum 0)
- If `batteryPercentages[i] <= 0`, skip the device

Return the count of tested devices.

### Example

```
Input: batteryPercentages = [1, 1, 2, 1, 3]
Output: 3
Explanation:
- Test device 0 (battery=1 > 0), decrease others: [1, 0, 1, 0, 2]
- Skip device 1 (battery=0)
- Test device 2 (battery=1 > 0), decrease others: [1, 0, 1, 0, 1]
- Skip device 3
- Test device 4 (battery=1 > 0)
Total tested = 3
```

## Approach

Iterate through the array. Track the cumulative decrease applied to future devices. For each device, check if its adjusted battery (original minus cumulative decrease) is positive. If so, increment test count and cumulative decrease.

## C# Solution

```csharp
public class Solution
{
    public int CountTestedDevices(int[] batteryPercentages)
    {
        int testedCount = 0;
        int decrease = 0;

        foreach (int battery in batteryPercentages)
        {
            int adjustedBattery = Math.Max(0, battery - decrease);

            if (adjustedBattery > 0)
            {
                testedCount++;
                decrease++;
            }
        }

        return testedCount;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
