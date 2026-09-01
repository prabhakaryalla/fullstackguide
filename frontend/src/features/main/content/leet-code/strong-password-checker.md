# 420. Strong Password Checker

**Difficulty:** Hard
**Category:** String, Greedy

## Problem

Given a string `password`, return the minimum number of steps required to make it a strong password, where a strong password has length between 6 and 20, contains at least one lowercase letter, one uppercase letter, and one digit, and has no three repeating characters in a row. In one step you can insert, delete, or replace one character.

### Example

```
Input: password = "1337C0d3"
Output: 0
```

### Constraints

- `1 <= password.length <= 50`
- `password` consists of letters, digits, dots `'.'`, or exclamation marks `'!'`.

## Approach

Handle three length regimes separately. If the password is too short (`< 6`), each inserted character can also fix a missing character type, so the answer is `max(missingTypes, 6 - length)`. If the length is already valid (`6`-`20`), only replacements are needed: each run of `k` repeated characters requires `⌊k/3⌋` replacements, so the answer is `max(missingTypes, totalReplacements)`. If too long (`> 20`), required deletions are applied greedily to repeated-character runs first — prioritizing runs where `length % 3` is `1` (one deletion removes a needed replacement) then `2`, before falling back to deleting in the excess repeated runs — since deletions reduce future replacement needs at different efficiencies depending on the run's remainder mod 3.

## C# Solution

```csharp
public class Solution
{
    public int StrongPasswordChecker(string password)
    {
        int n = password.Length;
        bool hasLower = false, hasUpper = false, hasDigit = false;

        foreach (var c in password)
        {
            if (char.IsLower(c)) hasLower = true;
            else if (char.IsUpper(c)) hasUpper = true;
            else if (char.IsDigit(c)) hasDigit = true;
        }

        int missingTypes = (hasLower ? 0 : 1) + (hasUpper ? 0 : 1) + (hasDigit ? 0 : 1);

        var runs = new List<int>();
        int i = 0;
        while (i < n)
        {
            int j = i;
            while (j < n && password[j] == password[i]) j++;

            int runLength = j - i;
            if (runLength >= 3) runs.Add(runLength);

            i = j;
        }

        if (n < 6) return Math.Max(missingTypes, 6 - n);

        if (n <= 20)
        {
            int replacements = runs.Sum(r => r / 3);
            return Math.Max(missingTypes, replacements);
        }

        int deleteCount = n - 20;
        int remainingDeletes = deleteCount;

        for (int mod = 1; mod <= 2 && remainingDeletes > 0; mod++)
        {
            for (int idx = 0; idx < runs.Count && remainingDeletes > 0; idx++)
            {
                if (runs[idx] < 3 || runs[idx] % 3 != mod) continue;

                int take = Math.Min(remainingDeletes, mod);
                runs[idx] -= take;
                remainingDeletes -= take;
            }
        }

        int replacementsNeeded = runs.Where(r => r >= 3).Sum(r => r / 3);

        if (remainingDeletes > 0)
        {
            replacementsNeeded -= remainingDeletes / 3;
        }

        return deleteCount + Math.Max(missingTypes, replacementsNeeded);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the run-length list.
