# 193. Valid Phone Numbers

**Difficulty:** Easy
**Category:** Shell, Text Processing, Regex

## Problem

Given a text file `file.txt` containing one phone number per line, print only the lines that represent valid phone numbers in the format `(xxx) xxx-xxxx` or `xxx-xxx-xxxx` (where each `x` is a digit).

### Example

```
"987-123-4567\n123 456 7890\n(123) 456-7890" -> "987-123-4567\n(123) 456-7890"
```

## Approach

Use a regular expression that anchors both ends of the line and matches either of the two accepted formats, then filter the file's lines against it — a job well suited to `grep -E` with an extended regex pattern.

## Shell Solution

```bash
grep -E '^([0-9]{3}-|\([0-9]{3}\) )[0-9]{3}-[0-9]{4}$' file.txt
```

## Complexity

- **Time:** `O(n)` — each line is matched once, where `n` is the number of lines.
- **Space:** `O(1)` extra, excluding the output.
