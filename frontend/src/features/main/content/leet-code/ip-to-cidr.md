# 751. IP to CIDR

**Difficulty:** Medium
**Category:** String, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a starting IP address `ip` and the number of IP addresses `n` you want to cover, return the smallest possible list of CIDR blocks that exactly covers the range of `n` IP addresses starting at `ip`.

### Example

```
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
```

## Approach

Convert the IP address to a 32-bit integer. Repeatedly take the largest CIDR block that both starts exactly at the current address (determined by the number of trailing zero bits in the address, which limits alignment) and does not exceed the remaining count `n`. Convert the block size back to a prefix length, emit the CIDR string, then advance the current address by the block size and subtract it from `n`. Repeat until `n` reaches zero.

## C# Solution

```csharp
public class Solution
{
    public IList<string> IpToCIDR(string ip, int n)
    {
        long start = IpToLong(ip);
        var result = new List<string>();

        while (n > 0)
        {
            int maxBits = LowestSetBit(start);
            int count = 1 << maxBits;

            while (count > n)
            {
                count >>= 1;
                maxBits--;
            }

            int prefixLength = 32 - maxBits;
            result.Add(LongToIp(start) + "/" + prefixLength);

            start += count;
            n -= count;
        }

        return result;
    }

    private long IpToLong(string ip)
    {
        var parts = ip.Split('.');
        long result = 0;
        foreach (var part in parts)
            result = (result << 8) + long.Parse(part);
        return result;
    }

    private string LongToIp(long value)
    {
        return $"{(value >> 24) & 255}.{(value >> 16) & 255}.{(value >> 8) & 255}.{value & 255}";
    }

    private int LowestSetBit(long value)
    {
        if (value == 0) return 32;
        int bits = 0;
        while ((value & 1) == 0)
        {
            value >>= 1;
            bits++;
        }
        return bits;
    }
}
```

## Complexity

- **Time:** `O(log n)` CIDR blocks are produced.
- **Space:** `O(1)` extra.
