# 192. Word Frequency

**Difficulty:** Medium
**Category:** Shell, Text Processing

## Problem

Given a text file `words.txt`, count the frequency of each word (case-sensitive, words separated by whitespace) and print each word with its count, sorted by frequency in descending order.

### Example

```
"the day is sunny the the\nthe sunny is is" -> "the 4\nis 3\nsunny 2\nday 1"
```

## Approach

Use standard Unix text-processing tools chained together: split the file's contents into one word per line, sort those words so identical ones are adjacent, count consecutive duplicates, then sort the resulting counts numerically in descending order and reformat as `word count`.

## Shell Solution

```bash
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -rn | awk '{print $2, $1}'
```

## Complexity

- **Time:** `O(n log n)` — dominated by the sort steps, where `n` is the number of words.
- **Space:** `O(n)` — for the intermediate sorted word list.
