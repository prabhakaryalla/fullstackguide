# 2757. Deep Merge of Two JSON Strings

**Difficulty:** Medium
**Category:** Hash Table, String, Depth-First Search

## Problem

Given two JSON strings `json1` and `json2`, merge them into a single JSON string following these rules:
- If both values are objects, recursively merge them
- If both values are arrays, concatenate them
- Otherwise, the value from `json2` takes precedence

Return the merged JSON string.

### Example

```
Input: json1 = '{"a":1,"b":2}', json2 = '{"b":3,"c":4}'
Output: '{"a":1,"b":3,"c":4}'
```

## Approach

Parse both JSON strings into dictionaries or objects. Perform a deep merge by recursively traversing both structures. For each key:
- If the key exists in both and both values are objects, recursively merge them
- If the key exists in both and both values are arrays, concatenate them  
- Otherwise, take the value from json2 if it exists, else from json1

Finally, serialize the merged structure back to a JSON string.

## C# Solution

```csharp
public class Solution
{
    public string DeepMerge(string json1, string json2)
    {
        var obj1 = JsonSerializer.Deserialize<Dictionary<string, object>>(json1);
        var obj2 = JsonSerializer.Deserialize<Dictionary<string, object>>(json2);
        
        var merged = Merge(obj1, obj2);
        
        return JsonSerializer.Serialize(merged);
    }
    
    private object Merge(object val1, object val2)
    {
        if (val1 is JsonElement elem1 && val2 is JsonElement elem2)
        {
            if (elem1.ValueKind == JsonValueKind.Object && elem2.ValueKind == JsonValueKind.Object)
            {
                var dict1 = JsonSerializer.Deserialize<Dictionary<string, object>>(elem1.GetRawText());
                var dict2 = JsonSerializer.Deserialize<Dictionary<string, object>>(elem2.GetRawText());
                
                foreach (var kvp in dict2)
                {
                    if (dict1.ContainsKey(kvp.Key))
                    {
                        dict1[kvp.Key] = Merge(dict1[kvp.Key], kvp.Value);
                    }
                    else
                    {
                        dict1[kvp.Key] = kvp.Value;
                    }
                }
                
                return dict1;
            }
            else if (elem1.ValueKind == JsonValueKind.Array && elem2.ValueKind == JsonValueKind.Array)
            {
                var arr1 = JsonSerializer.Deserialize<List<object>>(elem1.GetRawText());
                var arr2 = JsonSerializer.Deserialize<List<object>>(elem2.GetRawText());
                arr1.AddRange(arr2);
                return arr1;
            }
        }
        
        return val2;
    }
}
```

## Complexity

- **Time:** O(n + m) where n and m are the sizes of the JSON structures
- **Space:** O(n + m) for storing the parsed and merged objects
