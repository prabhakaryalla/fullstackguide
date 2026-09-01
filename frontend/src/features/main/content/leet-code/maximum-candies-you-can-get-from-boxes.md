# 1298. Maximum Candies You Can Get from Boxes

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Graph

## Problem

Given `n` boxes, each with an open/closed `status`, a `candies` count, a list of `keys` it contains (which unlock other boxes), and a list of `containedBoxes` (other boxes found inside it), along with a starting set of `initialBoxes`, return the maximum total candies collectible by opening boxes (an already-open box, or one for which you've found a key, can always be opened once you possess it).

### Example

```
Input: status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
Output: 16
```

## Approach

Track which boxes are currently held and which have already been opened. Repeatedly scan all held boxes: whenever an unopened, currently-unlocked box is found, "open" it — collect its candies, mark it opened, unlock any boxes referenced by its keys (even ones not yet held), and add any boxes found inside it to the held set. Keep repeating this full scan until an entire pass makes no further progress, since unlocking a box or acquiring a new one can retroactively make previously-stuck boxes openable.

## C# Solution

```csharp
public class Solution
{
    public int MaxCandies(int[] status, int[] candies, int[][] keys, int[][] containedBoxes, int[] initialBoxes)
    {
        var hasBox = new HashSet<int>(initialBoxes);
        var opened = new HashSet<int>();
        int totalCandies = 0;
        bool changed = true;

        while (changed)
        {
            changed = false;

            foreach (int box in hasBox.ToList())
            {
                if (opened.Contains(box) || status[box] == 0) continue;

                opened.Add(box);
                totalCandies += candies[box];
                changed = true;

                foreach (int key in keys[box]) status[key] = 1;
                foreach (int contained in containedBoxes[box]) hasBox.Add(contained);
            }
        }

        return totalCandies;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case, where `n` is the number of boxes.
- **Space:** `O(n)` for the held/opened tracking sets.
