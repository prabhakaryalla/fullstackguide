# 158. Read N Characters Given Read4 II - Call Multiple Times

**Difficulty:** Hard
**Category:** String, Simulation, Interactive

## Problem

This is a follow-up to Read N Characters Given Read4: implement a `Read(char[] buf, int n)` method that may be called **multiple times** on the same file. Characters left over from a previous `Read4` call (that weren't needed yet) must be buffered and reused on subsequent calls instead of being discarded.

### Example 1

```
Input: file = "abc", calls = [1, 2, 1]
Output: [1, 2, 0]
Explanation: first call reads "a"; second call reads "bc" (reusing leftover buffered chars); third call reads 0 chars since the file is exhausted.
```

### Constraints

- `1 <= file.length <= 500`
- `Read` may be called multiple times.

## Approach

Keep instance-level state across calls: a small buffer holding characters from the most recent `Read4` call that haven't been consumed yet, plus how many of them remain and the read offset into that buffer. Each call to `Read` first drains any leftover buffered characters before calling `Read4` again for more.

## C# Solution

```csharp
public class Solution
{
    private readonly char[] leftover = new char[4];
    private int leftoverCount = 0;
    private int leftoverStart = 0;

    public int Read4(char[] buf4)
    {
        // Provided by the platform; reads up to 4 characters into buf4.
        return 0;
    }

    public int Read(char[] buf, int n)
    {
        int totalRead = 0;

        while (totalRead < n)
        {
            if (leftoverStart == leftoverCount)
            {
                leftoverCount = Read4(leftover);
                leftoverStart = 0;
                if (leftoverCount == 0) break;
            }

            int toCopy = Math.Min(leftoverCount - leftoverStart, n - totalRead);
            Array.Copy(leftover, leftoverStart, buf, totalRead, toCopy);
            leftoverStart += toCopy;
            totalRead += toCopy;
        }

        return totalRead;
    }
}
```

## Complexity

- **Time:** `O(n)` amortized across all calls.
- **Space:** `O(1)` — a fixed 4-character buffer persists between calls.
