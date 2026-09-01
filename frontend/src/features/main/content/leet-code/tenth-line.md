# 195. Tenth Line

**Difficulty:** Easy
**Category:** Shell, Text Processing

## Problem

Given a text file `file.txt`, print just its 10th line. If the file has fewer than 10 lines, nothing should be printed.

### Example

```
file.txt with 10+ lines -> prints only line 10
```

## Approach

Use `sed` with the `-n` flag (suppress automatic printing) and a `10p` address, which prints only line number 10 and nothing else; if the file is shorter, `sed` simply reaches end-of-file without matching that address.

## Shell Solution

```bash
sed -n '10p' file.txt
```

## Complexity

- **Time:** `O(n)` — reads through the file up to (at most) line 10.
- **Space:** `O(1)`.
