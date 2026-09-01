# 1169. Invalid Transactions

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

## Problem

Given a list of transactions, each formatted as `"name,time,amount,city"`, a transaction is invalid if its `amount` exceeds `1000`, or if the same person has another transaction within `60` minutes in a different city. Return all invalid transactions, in any order.

### Example

```
Input: transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
Output: ["alice,20,800,mtv","alice,50,100,beijing"]
```

## Approach

Parse every transaction into its fields, then group transaction indices by `name`. For each transaction, first check the amount threshold; if that alone doesn't flag it, compare it against every other transaction by the same person, marking it invalid if any pair is within `60` minutes and occurred in a different city.

## C# Solution

```csharp
public class Solution
{
    public IList<string> InvalidTransactions(string[] transactions)
    {
        int n = transactions.Length;
        var parsed = new (string name, int time, int amount, string city)[n];

        for (int i = 0; i < n; i++)
        {
            var parts = transactions[i].Split(',');
            parsed[i] = (parts[0], int.Parse(parts[1]), int.Parse(parts[2]), parts[3]);
        }

        var byName = new Dictionary<string, List<int>>();
        for (int i = 0; i < n; i++)
        {
            if (!byName.TryGetValue(parsed[i].name, out var list))
            {
                list = new List<int>();
                byName[parsed[i].name] = list;
            }
            list.Add(i);
        }

        var result = new List<string>();

        for (int i = 0; i < n; i++)
        {
            bool invalid = parsed[i].amount > 1000;

            if (!invalid)
            {
                foreach (int j in byName[parsed[i].name])
                {
                    if (j == i) continue;
                    if (Math.Abs(parsed[i].time - parsed[j].time) <= 60 && parsed[i].city != parsed[j].city)
                    {
                        invalid = true;
                        break;
                    }
                }
            }

            if (invalid) result.Add(transactions[i]);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)` worst case (bounded by transactions sharing the same name).
- **Space:** `O(n)` for the parsed data and grouping.
