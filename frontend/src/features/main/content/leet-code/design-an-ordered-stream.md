# 1656. Design an Ordered Stream

**Difficulty:** Easy
**Category:** Array, Hash Table, Design, Data Stream

## Problem

Design an `OrderedStream` of `n` values (indexed `1` to `n`), initially all unknown. Implement `Insert(idKey, value)`, which stores the value at `idKey` and returns the longest contiguous run of now-known values starting from the current pointer position (advancing the pointer past the returned run), and the constructor `OrderedStream(n)`.

### Example

```
Input: ["OrderedStream","insert","insert","insert","insert","insert"]
       [[5],[3,"ccccc"],[1,"aaaaa"],[2,"bbbbb"],[4,"ddddd"],[5,"eeeee"]]
Output: [null,[],["aaaaa"],["bbbbb","ccccc"],[],["ddddd","eeeee"]]
```

## Approach

Store values in an array indexed by `idKey`, and maintain a pointer starting at `1`. After each insert, advance the pointer while the slot it points to is filled, collecting each value into the result list.

## C# Solution

```csharp
public class OrderedStream
{
    private readonly string[] values;
    private int pointer;

    public OrderedStream(int n)
    {
        values = new string[n + 1];
        pointer = 1;
    }

    public IList<string> Insert(int idKey, string value)
    {
        values[idKey] = value;
        List<string> result = new List<string>();

        while (pointer < values.Length && values[pointer] != null)
        {
            result.Add(values[pointer]);
            pointer++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per insert.
- **Space:** `O(n)`.
