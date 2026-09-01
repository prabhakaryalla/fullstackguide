# 2935. Maximum Strong Pair XOR II

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Trie

## Problem

Similar to problem 2932 but with larger constraints requiring an optimized solution using a Trie. Find the maximum XOR of any strong pair where `|x - y| <= min(x, y)`.

### Example

```
Input: nums = [1,2,3,4,5]
Output: 7
```

## Approach

Sort the array. Use a sliding window with a Trie to maintain valid pairs. For each element, add smaller elements that satisfy the strong condition to a Trie, then query the Trie for maximum XOR with the current element.

## C# Solution

```csharp
public class Solution 
{
    private class TrieNode 
    {
        public TrieNode[] Children = new TrieNode[2];
    }
    
    public int MaximumStrongPairXor(int[] nums) 
    {
        Array.Sort(nums);
        TrieNode root = new TrieNode();
        int maxXor = 0;
        int left = 0;
        
        for (int right = 0; right < nums.Length; right++) 
        {
            while (left < right && nums[left] * 2 < nums[right]) 
            {
                left++;
            }
            
            for (int i = left; i < right; i++) 
            {
                Insert(root, nums[i]);
            }
            
            if (left < right) 
            {
                maxXor = Math.Max(maxXor, Query(root, nums[right]));
            }
            
            root = new TrieNode();
        }
        
        return maxXor;
    }
    
    private void Insert(TrieNode root, int num) 
    {
        TrieNode node = root;
        for (int i = 31; i >= 0; i--) 
        {
            int bit = (num >> i) & 1;
            if (node.Children[bit] == null) 
            {
                node.Children[bit] = new TrieNode();
            }
            node = node.Children[bit];
        }
    }
    
    private int Query(TrieNode root, int num) 
    {
        TrieNode node = root;
        int xor = 0;
        for (int i = 31; i >= 0; i--) 
        {
            int bit = (num >> i) & 1;
            int oppositeBit = 1 - bit;
            
            if (node.Children[oppositeBit] != null) 
            {
                xor |= (1 << i);
                node = node.Children[oppositeBit];
            } 
            else if (node.Children[bit] != null) 
            {
                node = node.Children[bit];
            } 
            else 
            {
                return 0;
            }
        }
        return xor;
    }
}
```

## Complexity

- **Time:** O(n^2 * 32) in worst case, typically O(n * 32) with pruning
- **Space:** O(n * 32) for Trie
