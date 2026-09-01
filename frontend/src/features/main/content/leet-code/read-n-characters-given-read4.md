# 157. Read N Characters Given Read4

**Difficulty:** Easy
**Category:** String, Simulation, Interactive

## Problem

Given a `Read4` API that reads 4 characters at a time from a file into a buffer (returning the actual number of characters read, which may be less than 4 near the end of the file), implement a `Read(char[] buf, int n)` method that reads exactly `n` characters from the file into `buf` using only calls to `Read4`, and returns the number of characters actually read.

### Example 1

```
Input: file = "abc", n = 4
Output: 3
Explanation: after calling Read4 once (reading "abc" — only 3 chars remain), Read copies all 3 into buf.
```

### Example 2

```
Input: file = "abcde", n = 5
Output: 5
```

### Constraints

- `1 <= file.length <= 500`
- `file` consists of English letters and digits.
- `1 <= n <= 1000`

## Approach

Repeatedly call `Read4` into a small temporary 4-character buffer, copying as many of those characters as still fit into `buf` (without exceeding `n`). Stop as soon as either `Read4` returns fewer than 4 characters (end of file) or `n` characters have been copied.

## C# Solution

```csharp
public class Solution
{
    public int Read4(char[] buf4)
    {
        // Provided by the platform; reads up to 4 characters into buf4.
        return 0;
    }

    public int Read(char[] buf, int n)
    {
        var buf4 = new char[4];
        int totalRead = 0;

        while (totalRead < n)
        {
            int count = Read4(buf4);
            if (count == 0) break;

            int toCopy = Math.Min(count, n - totalRead);
            Array.Copy(buf4, 0, buf, totalRead, toCopy);
            totalRead += toCopy;

            if (count < 4) break; // reached end of file
        }

        return totalRead;
    }
}
```

## Complexity

- **Time:** `O(n)` — a constant number of characters copied per `Read4` call.
- **Space:** `O(1)` extra, excluding the output buffer.
