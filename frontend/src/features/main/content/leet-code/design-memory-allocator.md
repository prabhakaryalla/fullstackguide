# 2502. Design Memory Allocator

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Simulation

## Problem

Design a memory allocator with a contiguous block of memory of size `n` that handles the following two operations:
1. `allocate(size, mID)`: Find the leftmost contiguous block of `size` consecutive free memory units and allocate it with the ID `mID`. Return the starting index of the allocated block, or -1 if no such block exists.
2. `free(mID)`: Free all memory units with the ID `mID`.

### Example

```
Input: ["Allocator", "allocate", "allocate", "allocate", "free", "allocate"]
       [[10], [1, 1], [1, 2], [1, 3], [2], [3, 4]]
Output: [null, 0, 1, 2, null, 1]
```

## Approach

Maintain an array representing the memory blocks, where each cell stores the mID of the allocated memory or 0 if free. For allocation, scan the array to find the first contiguous free block of the required size. For freeing, scan and reset all cells with the given mID to 0.

## C# Solution

```csharp
public class Allocator
{
    private int[] memory;
    
    public Allocator(int n)
    {
        memory = new int[n];
    }
    
    public int Allocate(int size, int mID)
    {
        int count = 0;
        for (int i = 0; i < memory.Length; i++)
        {
            if (memory[i] == 0)
            {
                count++;
                if (count == size)
                {
                    int start = i - size + 1;
                    for (int j = start; j <= i; j++)
                    {
                        memory[j] = mID;
                    }
                    return start;
                }
            }
            else
            {
                count = 0;
            }
        }
        return -1;
    }
    
    public int Free(int mID)
    {
        int freed = 0;
        for (int i = 0; i < memory.Length; i++)
        {
            if (memory[i] == mID)
            {
                memory[i] = 0;
                freed++;
            }
        }
        return freed;
    }
}
```

## Complexity

- **Time:** O(n) for both allocate and free operations
- **Space:** O(n) for the memory array
