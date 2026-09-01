# 1517. Find Users With Valid E-Mails

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Users(user_id, name, mail)`, return the users whose emails are valid. A valid email must start with a letter, followed by any number of letters, digits, underscores, periods, or dashes, and end with `@leetcode.com`.

### Example

```
Input: Users: (1, "Winston", "winston@leetcode.com"), (2, "Jonathan", "jonathanisgreat")
Output: [(1, "Winston", "winston@leetcode.com")]
```

## Approach

This is a SQL problem (no C# solution applies). Use a regular expression to validate the pattern: a leading alphabetic character, followed by any combination of letters/digits/underscore/period/dash, ending exactly with `@leetcode.com`.

```sql
SELECT *
FROM Users
WHERE mail REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@leetcode\\.com$';
```

## Complexity

- **Time:** `O(n * L)` — a regex match per row, where `L` is the average email length.
- **Space:** `O(n)` for the result set.
