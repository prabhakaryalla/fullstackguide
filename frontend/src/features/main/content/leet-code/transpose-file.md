# 194. Transpose File

**Difficulty:** Medium
**Category:** Shell, Text Processing

## Problem

Given a text file `file.txt` containing tab-separated values arranged in rows and columns, transpose its content so rows become columns and columns become rows.

### Example

```
"name age\nalice 21\nryan 30" -> "name alice ryan\nage 21 30"
```

## Approach

Use `awk` to build up an in-memory 2D array while reading every input row, then, after the whole file has been consumed, print the array column by column (i.e. iterate columns as the outer loop and rows as the inner loop) to produce the transposed output.

## Shell Solution

```bash
awk '
{
    for (i = 1; i <= NF; i++) {
        cell[NR, i] = $i
    }
    if (NF > maxCols) maxCols = NF
    maxRows = NR
}
END {
    for (i = 1; i <= maxCols; i++) {
        line = cell[1, i]
        for (j = 2; j <= maxRows; j++) {
            line = line " " cell[j, i]
        }
        print line
    }
}' file.txt
```

## Complexity

- **Time:** `O(rows * cols)` — every cell is read and written once.
- **Space:** `O(rows * cols)` — the whole grid is buffered in memory before printing.
