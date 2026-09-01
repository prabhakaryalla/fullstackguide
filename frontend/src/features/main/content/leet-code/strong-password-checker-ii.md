# 2299. Strong Password Checker II

**Difficulty:** Easy
**Category:** String

## Problem

A password is strong if it satisfies all the following criteria:
- It has at least 8 characters.
- It contains at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()-+).
- It does not contain 2 of the same character in adjacent positions.

Return `true` if `password` is strong, otherwise `false`.

### Example

```
Input: password = "IloveLe3tcode!"
Output: true
Explanation: Meets all criteria: length 14, has lowercase/uppercase/digit/special, no adjacent repeats.
```

## Approach

Check each criterion sequentially: length >= 8, presence of each required character type, and no adjacent duplicates by scanning through once.

## C# Solution

```csharp
public class Solution
{
    public bool StrongPasswordCheckerII(string password)
    {
        if (password.Length < 8) return false;
        
        bool hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false;
        string special = "!@#$%^&*()-+";
        
        for (int i = 0; i < password.Length; i++)
        {
            char c = password[i];
            
            if (char.IsLower(c)) hasLower = true;
            else if (char.IsUpper(c)) hasUpper = true;
            else if (char.IsDigit(c)) hasDigit = true;
            else if (special.Contains(c)) hasSpecial = true;
            
            if (i > 0 && password[i] == password[i - 1]) return false;
        }
        
        return hasLower && hasUpper && hasDigit && hasSpecial;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
