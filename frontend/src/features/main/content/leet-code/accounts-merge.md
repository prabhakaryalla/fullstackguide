# 721. Accounts Merge

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Depth-First Search, Breadth-First Search, Union Find, Sorting

## Problem

Given a list of `accounts`, each starting with a name followed by a list of emails, merge accounts that share at least one common email (implying they belong to the same person), and return the merged accounts with emails sorted, keeping the original name for each merged group.

### Example

```
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnny@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnny@mail.com"]]
```

## Approach

Treat each account as a node in a Union-Find structure. For every email, remember which account index first introduced it; if a later account also contains that email, union the two accounts together (they belong to the same person). After processing all accounts, group emails by their account's root, sorting each group, and pair each group with the name from any account sharing that root.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public IList<IList<string>> AccountsMerge(IList<IList<string>> accounts)
    {
        int n = accounts.Count;
        parent = new int[n];
        for (int i = 0; i < n; i++)
            parent[i] = i;

        var ownerIndexByEmail = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            for (int j = 1; j < accounts[i].Count; j++)
            {
                var email = accounts[i][j];

                if (ownerIndexByEmail.TryGetValue(email, out var existingIndex))
                    Union(i, existingIndex);
                else
                    ownerIndexByEmail[email] = i;
            }
        }

        var emailsByRoot = new Dictionary<int, SortedSet<string>>();

        for (int i = 0; i < n; i++)
        {
            int root = Find(i);
            if (!emailsByRoot.TryGetValue(root, out var emails))
            {
                emails = new SortedSet<string>(StringComparer.Ordinal);
                emailsByRoot[root] = emails;
            }

            for (int j = 1; j < accounts[i].Count; j++)
                emails.Add(accounts[i][j]);
        }

        var result = new List<IList<string>>();
        foreach (var pair in emailsByRoot)
        {
            var name = accounts[pair.Key][0];
            var group = new List<string> { name };
            group.AddRange(pair.Value);
            result.Add(group);
        }

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);

        return parent[x];
    }

    private void Union(int x, int y)
    {
        int rootX = Find(x), rootY = Find(y);
        if (rootX != rootY)
            parent[rootX] = rootY;
    }
}
```

## Complexity

- **Time:** `O(n * k * log(n * k))`, where `k` is the average number of emails per account.
- **Space:** `O(n * k)` for the union-find structure and email groups.
