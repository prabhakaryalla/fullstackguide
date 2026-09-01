# 2284. Sender With Largest Word Count

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Counting

## Problem

You are given two string arrays `messages` and `senders` of the same length where `messages[i]` is a message sent by `senders[i]`.

A message is a list of words separated by single spaces. The word count of a sender is the total number of words sent by the sender across all messages.

Return the sender with the largest word count. If multiple senders have the same largest word count, return the one with the lexicographically largest name.

### Example

```
Input: messages = ["Hello userTwooo","Hi userThree","Wonderful day Alice","Nice day userThree"], senders = ["Alice","userTwo","userThree","Alice"]
Output: "Alice"
Explanation:
- Alice sent messages[0] (2 words) + messages[3] (3 words) = 5 words
- userTwo sent messages[1] (2 words) = 2 words
- userThree sent messages[2] (3 words) = 3 words
Alice has the largest word count with 5 words.
```

## Approach

Use a hash map to track total word count per sender. Count words in each message by splitting on spaces or counting spaces + 1. After processing all messages, find the sender with maximum word count, breaking ties lexicographically.

## C# Solution

```csharp
public class Solution
{
    public string LargestWordCount(string[] messages, string[] senders)
    {
        Dictionary<string, int> wordCount = new Dictionary<string, int>();
        
        for (int i = 0; i < messages.Length; i++)
        {
            int words = messages[i].Split(' ').Length;
            wordCount[senders[i]] = wordCount.GetValueOrDefault(senders[i], 0) + words;
        }
        
        string result = "";
        int maxCount = 0;
        
        foreach (var kvp in wordCount)
        {
            if (kvp.Value > maxCount || (kvp.Value == maxCount && string.Compare(kvp.Key, result) > 0))
            {
                maxCount = kvp.Value;
                result = kvp.Key;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of messages and m is average message length.
- **Space:** O(k) where k is number of unique senders.
