# 2092. Find All People With Secret

**Difficulty:** Hard
**Category:** Union Find, Graph, Sorting

## Problem

There are `n` people, numbered `0` to `n - 1`. Person `0` has a secret and shares it with person `firstPerson` at time `0`. You are given a list of `meetings`, where `meetings[i] = [xi, yi, timei]` means persons `xi` and `yi` have a meeting at `timei` (a person can attend multiple meetings at the same time). A person learns the secret if, at the time of a meeting they attend, at least one other attendee of that same meeting already knows the secret (knowledge can also spread transitively through a chain of same-time meetings). Return an array of all people who eventually learn the secret.

## Approach

Sort meetings by time and process them in **groups sharing the same timestamp** (since knowledge only propagates among people who already knew the secret *before* this exact timestamp, or who connect to such a person through meetings happening at this same timestamp — future meetings can't retroactively help).

For each time group, use a temporary Union-Find: union every pair of attendees within that group's meetings. After processing the whole group, check every person involved in that group: if they are **not** connected (via `Find`) to person `0` (who always knows the secret), reset them to be their own isolated parent again — this "undoes" any incorrect unions where people were merged together only because they met each other, but neither of them (nor anyone in their merged group) actually already knew the secret at this exact time. Repeat for every time group in increasing time order. At the end, everyone connected to person `0`'s group knows the secret.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public IList<int> FindAllPeople(int n, int[][] meetings, int firstPerson)
    {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        Union(0, firstPerson);

        Array.Sort(meetings, (a, b) => a[2].CompareTo(b[2]));

        int idx = 0;
        while (idx < meetings.Length)
        {
            int time = meetings[idx][2];
            int start = idx;
            var peopleInGroup = new HashSet<int>();

            while (idx < meetings.Length && meetings[idx][2] == time)
            {
                Union(meetings[idx][0], meetings[idx][1]);
                peopleInGroup.Add(meetings[idx][0]);
                peopleInGroup.Add(meetings[idx][1]);
                idx++;
            }

            int secretRoot = Find(0);
            foreach (var person in peopleInGroup)
            {
                if (Find(person) != secretRoot)
                    parent[person] = person;
            }
        }

        var result = new List<int>();
        int root0 = Find(0);
        for (int i = 0; i < n; i++)
            if (Find(i) == root0)
                result.Add(i);

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x) parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA != rootB) parent[rootA] = rootB;
    }
}
```

## Complexity

- **Time:** `O(meetings.Length * alpha(n) log meetings.Length)` including the sort.
- **Space:** `O(n)` for the union-find structure.
