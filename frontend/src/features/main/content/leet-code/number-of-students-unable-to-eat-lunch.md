# 1700. Number of Students Unable to Eat Lunch

**Difficulty:** Easy
**Category:** Array, Stack, Simulation, Queue

## Problem

Students queue for sandwiches (each either circular `0` or square `1`), stacked in `sandwiches` (top at index `0`). Each student takes the top sandwich if it matches their preference; otherwise they go to the back of the queue. Return how many students end up unable to eat because no remaining student wants the remaining top sandwich.

### Example

```
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0
```

## Approach

Simulate with a queue of student preferences and a stack of sandwiches (top of stack = next sandwich to offer). Repeatedly dequeue the front student: if their preference matches the top sandwich, pop it and reset a "no progress" counter; otherwise send them to the back of the queue and increment the counter. Stop once a full lap of the queue passes with no student taking a sandwich (counter reaches the queue's current size), since no one left will ever want the top sandwich.

## C# Solution

```csharp
public class Solution
{
    public int CountStudents(int[] students, int[] sandwiches)
    {
        Queue<int> studentQueue = new Queue<int>(students);
        Stack<int> sandwichStack = new Stack<int>();

        for (int i = sandwiches.Length - 1; i >= 0; i--)
        {
            sandwichStack.Push(sandwiches[i]);
        }

        int rotationsWithoutProgress = 0;

        while (studentQueue.Count > 0 && rotationsWithoutProgress < studentQueue.Count)
        {
            int student = studentQueue.Dequeue();

            if (student == sandwichStack.Peek())
            {
                sandwichStack.Pop();
                rotationsWithoutProgress = 0;
            }
            else
            {
                studentQueue.Enqueue(student);
                rotationsWithoutProgress++;
            }
        }

        return studentQueue.Count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case.
- **Space:** `O(n)`.
