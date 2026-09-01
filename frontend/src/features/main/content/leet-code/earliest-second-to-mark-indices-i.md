# 3048. Earliest Second to Mark Indices I

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy

## Problem

You are given two 1-indexed integer arrays `nums` and `changeIndices`, both of length related as `n` and `m` respectively. At each second `s` from `1` to `m`, you may perform one of the following: do nothing; decrement any single unmarked index of `nums` by `1` (not going below `0`); or, if `nums[changeIndices[s] - 1] == 0`, mark that index. Every index of `nums` must eventually be marked. Return the earliest second by which all indices can be marked, or `-1` if it's impossible.

## Approach

Binary search on the answer: check whether marking every index is achievable by second `second`. For a fixed `second`, only consider the change-index events up to that point, and for each index, only its **last** occurrence in that window matters (marking can only happen right when the corresponding value has reached `0`, and only its last available change-index event can be used as the marking moment; earlier occurrences of the same index within the window are wasted, but they still let you spend that whole second doing free decrements elsewhere).

Simulate greedily: walk through the events up to `second`. Each second that is **not** the last occurrence of its index contributes one "free decrement" to a shared pool (`decrement` budget). Each second that **is** the last occurrence of its index must have already accumulated enough free decrements to bring that index's value down to `0` (`nums[index] <= decrement` budget spent so far); if so, consume that many decrements and mark the index. If every index ends up marked by using only the available budget, `second` is feasible.

Binary search over `second` from `0` to `m + 1` for the smallest feasible value.

## C# Solution

```csharp
public class Solution {
    public int EarliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
        int lo = 0, hi = changeIndices.Length + 1;

        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (CanMark(nums, changeIndices, mid))
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo <= changeIndices.Length ? lo : -1;
    }

    // Returns true if every index of `nums` can be marked using only the first `second` events.
    private bool CanMark(int[] nums, int[] changeIndices, int second) {
        int numMarked = 0;
        int decrement = 0;
        int[] indexToLastSecond = new int[nums.Length];
        Array.Fill(indexToLastSecond, -1);

        for (int i = 0; i < second; i++)
            indexToLastSecond[changeIndices[i] - 1] = i;

        for (int i = 0; i < second; i++) {
            int index = changeIndices[i] - 1;
            if (i == indexToLastSecond[index]) {
                if (nums[index] > decrement)
                    return false;
                decrement -= nums[index];
                numMarked++;
            } else {
                decrement++;
            }
        }

        return numMarked == nums.Length;
    }
}
```

## Complexity

- Time: O(m log m) — binary search over the answer, each check doing O(m) work.
- Space: O(n) — the last-occurrence tracking array.
