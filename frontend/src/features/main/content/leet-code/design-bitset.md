# 2166. Design Bitset

**Difficulty:** Medium
**Category:** Array, Hash Table, Design

## Problem

Implement a `Bitset` class that supports:
- `Bitset(int size)`: initializes the bitset with `size` bits, all set to 0
- `void fix(int idx)`: sets the bit at index `idx` to 1
- `void unfix(int idx)`: sets the bit at index `idx` to 0
- `void flip()`: flips all bits (0 to 1, 1 to 0)
- `boolean all()`: returns true if all bits are 1
- `boolean one()`: returns true if at least one bit is 1
- `int count()`: returns the number of bits set to 1
- `String toString()`: returns the current state as a binary string

### Example

```
Bitset bs = new Bitset(5);
bs.fix(3);     // [0,0,0,1,0]
bs.fix(1);     // [0,1,0,1,0]
bs.flip();     // [1,0,1,0,1]
bs.all();      // false
bs.one();      // true
bs.count();    // 3
bs.toString(); // "10101"
```

## Approach

Maintain the bitset and track the count of 1's. To optimize the `flip()` operation (O(1) instead of O(n)), use a boolean flag to track if the bitset is flipped, and interpret operations accordingly.

## C# Solution

```csharp
public class Bitset
{
    private bool[] bits;
    private int oneCount;
    private bool isFlipped;
    
    public Bitset(int size)
    {
        bits = new bool[size];
        oneCount = 0;
        isFlipped = false;
    }
    
    public void Fix(int idx)
    {
        bool actualValue = bits[idx] ^ isFlipped;
        if (!actualValue)
        {
            bits[idx] = !bits[idx];
            oneCount++;
        }
    }
    
    public void Unfix(int idx)
    {
        bool actualValue = bits[idx] ^ isFlipped;
        if (actualValue)
        {
            bits[idx] = !bits[idx];
            oneCount--;
        }
    }
    
    public void Flip()
    {
        isFlipped = !isFlipped;
        oneCount = bits.Length - oneCount;
    }
    
    public bool All()
    {
        return oneCount == bits.Length;
    }
    
    public bool One()
    {
        return oneCount > 0;
    }
    
    public int Count()
    {
        return oneCount;
    }
    
    public override string ToString()
    {
        var sb = new StringBuilder();
        foreach (bool bit in bits)
        {
            bool actualValue = bit ^ isFlipped;
            sb.Append(actualValue ? '1' : '0');
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(1) for all operations except toString which is O(n)
- **Space:** O(n) for storing the bitset
