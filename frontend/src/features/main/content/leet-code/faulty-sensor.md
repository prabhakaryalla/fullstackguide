# 1826. Faulty Sensor

**Difficulty:** Easy
**Category:** Array

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Two sensors, `sensor1` and `sensor2`, recorded the same stream of readings, but one of them dropped exactly one reading and shifted all subsequent readings left by one position (with an arbitrary value appended at the end). Given both arrays, return `1` if `sensor1` is faulty, `2` if `sensor2` is faulty, or `-1` if it cannot be determined.

### Example

```
Input: sensor1 = [2,3,4,5], sensor2 = [2,1,3,4]
Output: 1
```

## Approach

Find the first index `i` where the two arrays diverge — everything before it is identical and uninformative. From that point, check whether shifting `sensor1` left by one (comparing `sensor1[j+1]` to `sensor2[j]` for `j` from `i` to `n-2`) matches; if so `sensor1` is the faulty one. Otherwise check the symmetric shift for `sensor2`. If neither shift matches (including the case where the arrays never diverged), the answer is ambiguous, so return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int BadSensor(int[] sensor1, int[] sensor2)
    {
        int n = sensor1.Length;
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) i++;

        if (i == n) return -1;

        if (Matches(sensor1, sensor2, i, 1)) return 1;
        if (Matches(sensor1, sensor2, i, 2)) return 2;
        return -1;
    }

    private bool Matches(int[] sensor1, int[] sensor2, int start, int faulty)
    {
        int n = sensor1.Length;
        for (int j = start; j < n - 1; j++)
        {
            int a = faulty == 1 ? sensor1[j + 1] : sensor1[j];
            int b = faulty == 1 ? sensor2[j] : sensor2[j + 1];
            if (a != b) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
