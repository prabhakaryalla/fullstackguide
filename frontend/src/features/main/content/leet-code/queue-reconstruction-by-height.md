# 406. Queue Reconstruction by Height

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an array `people` where `people[i] = [hi, ki]` represents a person with height `hi` and exactly `ki` other people in front who have a height `>= hi`, reconstruct and return the queue as an array of `[hi, ki]`.

### Example

```
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
```

### Constraints

- `1 <= people.length <= 2000`
- `0 <= hi <= 10^6`
- `0 <= ki < people.length`

## Approach

Sort people by height descending, breaking ties by `k` ascending. Insert each person into the result at index `k`: since all previously inserted people are at least as tall, inserting at position `k` guarantees exactly `k` taller-or-equal people end up in front, and shorter people inserted later never affect that count.

## C# Solution

```csharp
public class Solution
{
    public int[][] ReconstructQueue(int[][] people)
    {
        Array.Sort(people, (a, b) => a[0] != b[0] ? b[0] - a[0] : a[1] - b[1]);

        var result = new List<int[]>();
        foreach (var person in people)
            result.Insert(person[1], person);

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n^2)` — each insertion into the list can shift up to `O(n)` elements.
- **Space:** `O(n)` for the result list.
