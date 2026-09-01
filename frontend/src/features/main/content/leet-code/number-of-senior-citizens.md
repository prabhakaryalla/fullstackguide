# 2678. Number of Senior Citizens

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given a 0-indexed array of strings `details`. Each element of `details` provides information about a passenger in the format `"PPPPPPPPPPGGAL"` where:

- The first 10 characters consist of the phone number
- The next character is the gender
- The next character is the age (in years) as a single digit
- The last character is the age (in years) as a single digit

The age is represented by two digits. A passenger is considered a senior if their age is strictly greater than 60.

Return the number of passengers who are seniors.

### Example

```
Input: details = ["7868190130M7522","5303914400F9211","9273338290F4010"]
Output: 2
Explanation: Passengers at indices 0 and 2 are seniors (ages 75 and 40... wait, checking: positions 11-12 are "75", "92", "40". 75 and 92 are > 60).

Input: details = ["1313579440F2036","2921522980M5644"]
Output: 0
Explanation: Ages are 20 and 56, both not > 60.
```

## Approach

For each string, extract characters at positions 11 and 12 (0-indexed), convert them to an integer representing the age, and check if it's greater than 60.

## C# Solution

```csharp
public class Solution
{
    public int CountSeniors(string[] details)
    {
        int count = 0;
        
        foreach (string detail in details)
        {
            int age = int.Parse(detail.Substring(11, 2));
            if (age > 60)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of passengers
- **Space:** O(1)
