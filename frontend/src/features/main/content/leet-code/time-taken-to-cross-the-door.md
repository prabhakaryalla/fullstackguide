# 2534. Time Taken to Cross the Door

**Difficulty:** Hard
**Category:** Array, Queue, Simulation

## Problem

There are `n` persons numbered from `0` to `n - 1` who want to cross a door. You are given two integer arrays `arrival` and `state`.

- `arrival[i]` is the arrival time of the `i`th person
- `state[i]` is `0` if they want to enter, or `1` if they want to exit

The door has the following rules:
- At most one person can cross at each second
- If someone wants to exit and someone wants to enter at the same time, the person exiting has priority
- If multiple people want to go in the same direction, the person with the smaller index goes first
- If nobody used the door in the previous second, anyone can use it

Return an array `answer` where `answer[i]` is the time when the `i`th person crosses the door.

### Example

```
Input: arrival = [0,1,1,2,4], state = [0,1,0,0,1]
Output: [0,2,1,4,3]
Explanation:
Time 0: Person 0 enters
Time 1: Person 2 wants to enter, Person 1 wants to exit. Person 1 exits.
Time 2: Person 2 enters
Time 3: Person 4 exits
Time 4: Person 3 enters
```

## Approach

Use two queues (one for entering, one for exiting) and simulate the process second by second:

1. At each time `t`, add all people who have arrived by time `t` to their respective queues
2. Determine who can cross based on priority rules:
   - If door was used for exiting in previous second, exits have priority
   - If door was used for entering in previous second, enters have priority
   - If door was unused, exits have priority
3. Process one person and mark the time

## C# Solution

```csharp
public class Solution
{
    public int[] TimeTaken(int[] arrival, int[] state)
    {
        int n = arrival.Length;
        int[] answer = new int[n];
        var enterQueue = new Queue<int>();
        var exitQueue = new Queue<int>();
        
        int time = 0;
        int idx = 0;
        int prevState = 1; // Initially, exit has priority
        
        while (idx < n || enterQueue.Count > 0 || exitQueue.Count > 0)
        {
            // Add all arrivals at current time
            while (idx < n && arrival[idx] <= time)
            {
                if (state[idx] == 0)
                    enterQueue.Enqueue(idx);
                else
                    exitQueue.Enqueue(idx);
                idx++;
            }
            
            // Determine who crosses
            bool crossed = false;
            if (prevState == 1 && exitQueue.Count > 0)
            {
                // Exit has priority
                int person = exitQueue.Dequeue();
                answer[person] = time;
                prevState = 1;
                crossed = true;
            }
            else if (prevState == 0 && enterQueue.Count > 0)
            {
                // Enter has priority
                int person = enterQueue.Dequeue();
                answer[person] = time;
                prevState = 0;
                crossed = true;
            }
            else if (exitQueue.Count > 0)
            {
                int person = exitQueue.Dequeue();
                answer[person] = time;
                prevState = 1;
                crossed = true;
            }
            else if (enterQueue.Count > 0)
            {
                int person = enterQueue.Dequeue();
                answer[person] = time;
                prevState = 0;
                crossed = true;
            }
            
            if (!crossed && idx < n)
            {
                time = arrival[idx] - 1; // Jump to next arrival
                prevState = 1; // Reset to default (exit priority)
            }
            
            time++;
        }
        
        return answer;
    }
}
```

## Complexity

- **Time:** O(n + max_time)
- **Space:** O(n) for the queues
