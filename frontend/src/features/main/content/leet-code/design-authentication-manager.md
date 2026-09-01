# 1797. Design Authentication Manager

**Difficulty:** Medium
**Category:** Hash Table, Design, Ordered Dict

## Problem

Design an authentication manager with a fixed `timeToLive`. `Generate(tokenId, currentTime)` creates a new token valid until `currentTime + timeToLive`. `Renew(tokenId, currentTime)` extends an existing, still-valid token's expiry to `currentTime + timeToLive` (a no-op if the token doesn't exist or already expired). `CountUnexpiredTokens(currentTime)` returns how many tokens are still valid at that time.

### Example

```
Input: ["AuthenticationManager","renew","generate","countUnexpiredTokens"]
       [[5],["aaa",1],["aaa",2],[6]]
Output: [null,null,null,1]
```

## Approach

Store each token's expiry time in a hash map. `Generate` and a successful `Renew` simply set the token's expiry to `currentTime + timeToLive`. `CountUnexpiredTokens` scans the map and counts entries whose expiry is strictly greater than `currentTime`.

## C# Solution

```csharp
public class AuthenticationManager
{
    private readonly int timeToLive;
    private readonly Dictionary<string, int> expiry = new();

    public AuthenticationManager(int timeToLive)
    {
        this.timeToLive = timeToLive;
    }

    public void Generate(string tokenId, int currentTime)
    {
        expiry[tokenId] = currentTime + timeToLive;
    }

    public void Renew(string tokenId, int currentTime)
    {
        if (expiry.TryGetValue(tokenId, out int exp) && exp > currentTime)
            expiry[tokenId] = currentTime + timeToLive;
    }

    public int CountUnexpiredTokens(int currentTime)
    {
        int count = 0;
        foreach (int exp in expiry.Values)
            if (exp > currentTime) count++;
        return count;
    }
}
```

## Complexity

- **Time:** `O(1)` for `Generate`/`Renew`; `O(n)` for `CountUnexpiredTokens`.
- **Space:** `O(n)` for the token map.
