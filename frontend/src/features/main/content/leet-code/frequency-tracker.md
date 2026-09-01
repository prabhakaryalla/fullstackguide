# 2671. Frequency Tracker

**Difficulty:** Medium
**Category:** Hash Table, Design

## Problem

Design a data structure that tracks the frequency of elements and also tracks the frequency of frequencies.

Implement the `FrequencyTracker` class:

- `FrequencyTracker()` Initializes the data structure.
- `void add(int number)` Adds `number` to the data structure.
- `void deleteOne(int number)` Deletes one occurrence of `number` from the data structure. If `number` does not exist, do nothing.
- `bool hasFrequency(int frequency)` Returns `true` if there exists at least one number with the given `frequency`, otherwise returns `false`.

### Example

```
Input:
["FrequencyTracker", "add", "add", "hasFrequency"]
[[], [3], [3], [2]]
Output:
[null, null, null, true]
Explanation:
add(3) -> frequency of 3 is now 1
add(3) -> frequency of 3 is now 2
hasFrequency(2) -> returns true because 3 has frequency 2

Input:
["FrequencyTracker", "add", "deleteOne", "hasFrequency"]
[[], [1], [1], [1]]
Output:
[null, null, null, false]
```

## Approach

Maintain two hash maps:
1. `numFreq`: maps each number to its current frequency
2. `freqCount`: maps each frequency to how many numbers have that frequency

When adding or deleting, update both maps accordingly.

## C# Solution

```csharp
public class FrequencyTracker
{
    private Dictionary<int, int> numFreq;
    private Dictionary<int, int> freqCount;
    
    public FrequencyTracker()
    {
        numFreq = new Dictionary<int, int>();
        freqCount = new Dictionary<int, int>();
    }
    
    public void Add(int number)
    {
        int oldFreq = numFreq.GetValueOrDefault(number, 0);
        int newFreq = oldFreq + 1;
        
        if (oldFreq > 0)
        {
            freqCount[oldFreq]--;
            if (freqCount[oldFreq] == 0)
            {
                freqCount.Remove(oldFreq);
            }
        }
        
        numFreq[number] = newFreq;
        freqCount[newFreq] = freqCount.GetValueOrDefault(newFreq, 0) + 1;
    }
    
    public void DeleteOne(int number)
    {
        if (!numFreq.ContainsKey(number) || numFreq[number] == 0)
        {
            return;
        }
        
        int oldFreq = numFreq[number];
        int newFreq = oldFreq - 1;
        
        freqCount[oldFreq]--;
        if (freqCount[oldFreq] == 0)
        {
            freqCount.Remove(oldFreq);
        }
        
        if (newFreq > 0)
        {
            numFreq[number] = newFreq;
            freqCount[newFreq] = freqCount.GetValueOrDefault(newFreq, 0) + 1;
        }
        else
        {
            numFreq.Remove(number);
        }
    }
    
    public bool HasFrequency(int frequency)
    {
        return freqCount.ContainsKey(frequency) && freqCount[frequency] > 0;
    }
}
```

## Complexity

- **Time:** O(1) for all operations
- **Space:** O(n) where n is the number of distinct elements
