# 1772. Sort Features by Popularity

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of `features` and a list of user `responses` (each a space-separated string of words), the popularity of a feature is the number of responses that mention it as a whole word (counted once per response, even if repeated). Return the features sorted by popularity descending; ties keep the original relative order.

### Example

```
Input: features = ["cooler","lock","touch"], responses = ["i like cooler cooler","lock touch cooler"]
Output: ["cooler","lock","touch"]
```

## Approach

Put all features into a hash set for O(1) membership checks. For each response, split it into words and use a per-response "already counted" set so repeated words only count once; whenever a word is a known feature, increment its popularity. Finally, sort the original feature list by popularity descending, using the original index as the tie-breaker.

## C# Solution

```csharp
public class Solution
{
    public IList<string> SortFeatures(string[] features, string[] responses)
    {
        var popularity = new Dictionary<string, int>();
        var featureSet = new HashSet<string>(features);
        foreach (var f in features) popularity[f] = 0;

        foreach (var response in responses)
        {
            var seen = new HashSet<string>();
            foreach (var word in response.Split(' '))
            {
                if (featureSet.Contains(word) && seen.Add(word))
                    popularity[word]++;
            }
        }

        var indexed = features.Select((f, i) => (f, i)).ToList();
        indexed.Sort((a, b) =>
        {
            int cmp = popularity[b.f].CompareTo(popularity[a.f]);
            return cmp != 0 ? cmp : a.i.CompareTo(b.i);
        });

        return indexed.Select(x => x.f).ToArray();
    }
}
```

## Complexity

- **Time:** `O(totalWordsInResponses + features log features)`.
- **Space:** `O(features + totalWordsInResponses)`.
