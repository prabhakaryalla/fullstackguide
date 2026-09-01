# 1993. Operations on Tree

**Difficulty:** Medium
**Category:** Array, Tree, Depth-First Search, Design

## Problem

Design a data structure `LockingTree` for a tree of `n` nodes given by a `parent` array (root's parent is `-1`), supporting: `Lock(num, user)` — lock an unlocked node for `user`, returns success; `Unlock(num, user)` — unlock a node if locked by `user`; `Upgrade(num, user)` — locks `num` for `user` and unlocks all locked descendants, only allowed if `num` is currently unlocked, has at least one locked descendant, and has no locked ancestor.

### Example

```
Input operations lock various nodes, then Upgrade(0, 2) succeeds if node 0 is unlocked, some descendant is locked, and no ancestor of 0 is locked (trivially true since 0 is root).
```

### Constraints

- `2 <= n <= 2000`
- `parent.length == n`
- `0 <= parent[i] <= n - 1` for `i != 0`, and `parent[0] == -1`
- `0 <= num <= n - 1`
- `1 <= user <= 10^4`
- At most `2000` calls total across all functions.

## Approach

Maintain a `lockedBy` array (0 meaning unlocked) and precompute each node's children list from `parent`. `Lock`/`Unlock` are direct array checks/updates. For `Upgrade`, walk up from `num` to the root checking no ancestor is locked; then perform a DFS/BFS from `num` over descendants, collecting whether any are locked (and unlocking all locked ones found along the way); only commit the upgrade (lock `num`, unlock found descendants) if at least one locked descendant existed and no ancestor was locked.

## C# Solution

```csharp
public class LockingTree
{
    private readonly int[] _parent;
    private readonly int[] _lockedBy;
    private readonly List<int>[] _children;

    public LockingTree(int[] parent)
    {
        _parent = parent;
        int n = parent.Length;
        _lockedBy = new int[n];
        _children = new List<int>[n];
        for (int i = 0; i < n; i++) _children[i] = new List<int>();
        for (int i = 0; i < n; i++)
        {
            if (parent[i] != -1) _children[parent[i]].Add(i);
        }
    }

    public bool Lock(int num, int user)
    {
        if (_lockedBy[num] != 0) return false;
        _lockedBy[num] = user;
        return true;
    }

    public bool Unlock(int num, int user)
    {
        if (_lockedBy[num] != user) return false;
        _lockedBy[num] = 0;
        return true;
    }

    public bool Upgrade(int num, int user)
    {
        if (_lockedBy[num] != 0) return false;

        int ancestor = _parent[num];
        while (ancestor != -1)
        {
            if (_lockedBy[ancestor] != 0) return false;
            ancestor = _parent[ancestor];
        }

        var descendants = new List<int>();
        var stack = new Stack<int>();
        foreach (int child in _children[num]) stack.Push(child);

        bool hasLockedDescendant = false;
        while (stack.Count > 0)
        {
            int node = stack.Pop();
            if (_lockedBy[node] != 0)
            {
                hasLockedDescendant = true;
                descendants.Add(node);
            }
            foreach (int child in _children[node]) stack.Push(child);
        }

        if (!hasLockedDescendant) return false;

        foreach (int node in descendants) _lockedBy[node] = 0;
        _lockedBy[num] = user;
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Upgrade` call (ancestor walk plus descendant traversal); `O(1)` for `Lock`/`Unlock`.
- **Space:** `O(n)` for the children lists and lock-state array.
