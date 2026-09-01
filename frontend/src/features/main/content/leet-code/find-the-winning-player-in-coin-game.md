# 3222. Find the Winning Player in Coin Game

**Difficulty:** Easy
**Category:** Game Theory, Math, Simulation

## Problem
Alice and Bob take turns playing a coin game, with Alice going first. There are `x` coins worth 75 cents and `y` coins worth 10 cents. On each turn, a player must pay exactly 115 cents (using one 75-cent coin and four 10-cent coins) to take their turn; if a player cannot make this exact payment, they lose. Determine which player wins, assuming optimal play (though the outcome turns out to be fully determined by the coin counts alone).

## Approach
Each turn consumes exactly one 75-cent coin and four 10-cent coins. The number of turns that can possibly be played is therefore limited by `min(x, y / 4)` (using integer division for the 10-cent coins, since each turn needs 4 of them). Whoever is about to move when this limit is reached loses (since they cannot make a full payment). Since Alice moves on odd-numbered turns and Bob on even-numbered turns, if the maximum number of completable turns is even, the next player up (Alice again) fails to move, meaning Bob wins; if odd, Alice wins.

## C# Solution
```csharp
public class Solution {
    public string LosingPlayer(int x, int y) {
        int turns = Math.Min(x, y / 4);
        return turns % 2 == 0 ? "Bob" : "Alice";
    }
}
```

## Complexity
- Time: O(1)
- Space: O(1)
