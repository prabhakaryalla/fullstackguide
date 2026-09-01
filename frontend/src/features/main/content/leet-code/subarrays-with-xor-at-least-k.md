# 3632. Subarrays with XOR at Least K

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Prefix Sum, Trie
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `k`. Return the number of subarrays of `nums` whose bitwise XOR of all elements is greater than or equal to `k`.

### Example
Input: `nums = [1,2,3], k = 2`
Output: `3`
Explanation: The subarray XOR values are: `[1]=1`, `[2]=2`, `[3]=3`, `[1,2]=3`, `[2,3]=1`, `[1,2,3]=0`. Exactly three subarrays have XOR `>= 2`: `[2]` (2), `[3]` (3), and `[1,2]` (3).

Constraints:
- `1 <= nums.length <= 10^5`
- `0 <= nums[i], k <= 10^9`

## Approach
Let `prefix[i]` be the XOR of `nums[0..i-1]`. The XOR of subarray `nums[l..r]` equals `prefix[r+1] XOR prefix[l]`. For each new prefix value, count how many previously inserted prefixes `p` satisfy `prefix XOR p >= k`, then insert the new prefix.

This count is computed with a binary trie over the bits of the prefix values (from the highest bit down to the lowest, sized to cover the maximum of `nums`, `k`, and 1). At each trie node, while walking the bits of `k` and the current `prefix`: if the current bit of `k` is 0, then choosing the trie branch that makes the XOR bit 1 (strictly greater at this bit) guarantees all values in that subtree satisfy the condition, so its count is added immediately, and the walk continues down the branch that keeps the XOR bit equal to `k`'s bit (0) to handle the "still tied" case. If the current bit of `k` is 1, the walk must follow the branch that makes the XOR bit exactly 1 (no free additions), because falling behind at this bit cannot be recovered. After the traversal finishes without breaking, the remaining node's count is added (representing an exact XOR match with `k`).

## C# Solution

```csharp
public class Solution {
    private int[][] children;
    private int[] counts;
    private int nodeCount;
    private int bitLength;

    public long CountXorSubarrays(int[] nums, int k) {
        int mx = k;
        foreach (int x in nums) mx = Math.Max(mx, x);
        mx = Math.Max(mx, 1);

        bitLength = 0;
        int t = mx;
        while (t > 0) {
            bitLength++;
            t >>= 1;
        }

        int maxNodes = (nums.Length + 2) * (bitLength + 1) + 2;
        children = new int[maxNodes][];
        counts = new int[maxNodes];
        nodeCount = 0;
        NewNode();

        long result = 0;
        int prefix = 0;
        Add(prefix);
        foreach (int x in nums) {
            prefix ^= x;
            result += Query(prefix, k);
            Add(prefix);
        }

        return result;
    }

    private int NewNode() {
        children[nodeCount] = new int[] { -1, -1 };
        counts[nodeCount] = 0;
        return nodeCount++;
    }

    private void Add(int num) {
        int curr = 0;
        for (int i = bitLength - 1; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (children[curr][bit] == -1) {
                children[curr][bit] = NewNode();
            }
            curr = children[curr][bit];
            counts[curr]++;
        }
    }

    private long Query(int prefix, int k) {
        long result = 0;
        int curr = 0;
        for (int i = bitLength - 1; i >= 0 && curr != -1; i--) {
            int t = (k >> i) & 1;
            int x = (prefix >> i) & 1;
            if (t == 0) {
                int other = children[curr][1 ^ x];
                if (other != -1) {
                    result += counts[other];
                }
            }
            curr = children[curr][t ^ x];
        }
        if (curr != -1) {
            result += counts[curr];
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n log(maxVal)), where n is the length of nums.
- **Space:** O(n log(maxVal))
