# 2296. Design a Text Editor

**Difficulty:** Hard
**Category:** Linked List, String, Stack, Design, Simulation, Doubly-Linked List

## Problem

Design a text editor with a cursor that can do the following:
- Add text to where the cursor is.
- Delete characters to the left of the cursor.
- Move the cursor left or right.
- Return a string of length 10 from the cursor position showing the last 10 characters to the left.

Implement the `TextEditor` class with methods: `addText(text)`, `deleteText(k)`, `cursorLeft(k)`, `cursorRight(k)`.

### Example

```
TextEditor textEditor = new TextEditor();
textEditor.addText("leetcode");
textEditor.deleteText(4);                 // Deletes "code"
textEditor.addText("practice");           
textEditor.cursorRight(3);                
textEditor.cursorLeft(8);                 
textEditor.deleteText(10);                
textEditor.cursorLeft(2);                 
textEditor.cursorRight(6);                
```

## Approach

Use two stacks or a StringBuilder to represent text before and after the cursor. `addText` appends to left stack. `deleteText` pops from left stack. `cursorLeft/Right` move characters between stacks. Return the top 10 characters from the left stack.

## C# Solution

```csharp
public class TextEditor
{
    private StringBuilder left;
    private StringBuilder right;
    
    public TextEditor()
    {
        left = new StringBuilder();
        right = new StringBuilder();
    }
    
    public void AddText(string text)
    {
        left.Append(text);
    }
    
    public int DeleteText(int k)
    {
        int deleted = Math.Min(k, left.Length);
        left.Length -= deleted;
        return deleted;
    }
    
    public string CursorLeft(int k)
    {
        while (k > 0 && left.Length > 0)
        {
            right.Append(left[left.Length - 1]);
            left.Length--;
            k--;
        }
        return GetLeftText();
    }
    
    public string CursorRight(int k)
    {
        while (k > 0 && right.Length > 0)
        {
            left.Append(right[right.Length - 1]);
            right.Length--;
            k--;
        }
        return GetLeftText();
    }
    
    private string GetLeftText()
    {
        int start = Math.Max(0, left.Length - 10);
        return left.ToString(start, left.Length - start);
    }
}
```

## Complexity

- **Time:** O(1) for addText, O(k) for deleteText and cursor moves.
- **Space:** O(n) where n is total characters.
