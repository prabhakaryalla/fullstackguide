# 3475. DNA Pattern Recognition

**Difficulty:** Easy
**Category:** SQL, Database

## Problem
Table `Samples` holds `sample_id` and `dna_sequence` (a string over `A`, `T`, `G`, `C`).

For every sample, report whether the sequence:
- `has_start`: starts with `"ATG"`.
- `has_stop`: ends with `"TAA"`, `"TAG"`, or `"TGA"`.
- `has_atat`: contains the substring `"ATAT"`.
- `has_ggg`: contains the substring `"GGG"`.

Return the original columns plus these four boolean (0/1) flags, ordered by `sample_id`.

## Approach
Each flag is a straightforward pattern check on the `dna_sequence` column. Regular expressions make the prefix/suffix/substring checks concise: `^ATG` anchors the start, `TAA$|TAG$|TGA$` anchors the end with alternation, and plain substrings suffice for the other two checks.

## SQL Solution

```sql
SELECT
    *,
    dna_sequence REGEXP '^ATG' AS has_start,
    dna_sequence REGEXP 'TAA$|TAG$|TGA$' AS has_stop,
    dna_sequence REGEXP 'ATAT' AS has_atat,
    dna_sequence REGEXP 'GGG' AS has_ggg
FROM Samples
ORDER BY sample_id;
```

## Complexity

- **Time:** O(n * L), where n is the number of samples and L is the average sequence length
- **Space:** O(1) beyond the result set
