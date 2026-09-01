# 2588. Count the Number of Beautiful Subarrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums`. A subarray is beautiful if the bitwise XOR of all elements in the subarray equals 0.

Return the number of beautiful subarrays.

### Example

```
Input: nums = [4,3,1,2,4]
Output: 2
Explanation: 
Subarrays [4,3,1,2,4] and [1,2] are beautiful
4 ^ 3 ^ 1 ^ 2 ^ 4 = 0
1 ^ 2 ^ 1 = 0 (indices 2 to 4)
```

## Approach

Use prefix XOR. If `prefix[i] == prefix[j]`, then the subarray from `i+1` to `j` has XOR equal to 0. We maintain a frequency map of prefix XOR values seen so far. For each index, we check how many times the current prefix XOR has appeared before.

The insight is that XOR has the property that if `A ^ B = C`, then `A ^ C = B`. So if two prefix XORs are equal, the elements between them XOR to zero.

## C# Solution

```csharp
public class Solution
{
    public long BeautifulSubarrays(int[] nums)
    {
        var xorCount = new Dictionary<int, int>();
        xorCount[0] = 1;
        
        int prefixXor = 0;
        long result = 0;
        
        foreach (int num in nums)
        {
            prefixXor ^= num;
            
            if (xorCount.ContainsKey(prefixXor))
            {
                result += xorCount[prefixXor];
            }
            
            xorCount[prefixXor] = xorCount.GetValueOrDefault(prefixXor) + 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for the hash map
