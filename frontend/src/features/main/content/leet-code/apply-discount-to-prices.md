# 2288. Apply Discount to Prices

**Difficulty:** Medium
**Category:** String

## Problem

A sentence is a string of single-space separated words where each word can contain digits, lowercase letters, and the dollar sign `'$'`. A word represents a price if it is a non-negative real number preceded by a dollar sign.

You are given a string `sentence` representing a sentence and an integer `discount`. For each word representing a price, apply a discount of `discount%` on the price and update the word in the sentence. All updated prices should be represented with exactly two decimal places.

Return a string representing the modified sentence.

### Example

```
Input: sentence = "there are $1 $2 and 5$ candies in the shop", discount = 50
Output: "there are $0.50 $1.00 and 5$ candies in the shop"
Explanation:
- "$1" and "$2" are valid prices, so we discount them by 50%.
- "5$" is not a valid price format.
```

## Approach

Split the sentence into words. For each word, check if it's a valid price (starts with '$' followed by digits only). If valid, parse the price, apply the discount, format to 2 decimal places with '$' prefix. Join all words back together.

## C# Solution

```csharp
public class Solution
{
    public string DiscountPrices(string sentence, int discount)
    {
        var words = sentence.Split(' ');
        
        for (int i = 0; i < words.Length; i++)
        {
            if (IsValidPrice(words[i]))
            {
                long price = long.Parse(words[i].Substring(1));
                double discounted = price * (100 - discount) / 100.0;
                words[i] = "$" + discounted.ToString("F2");
            }
        }
        
        return string.Join(" ", words);
    }
    
    private bool IsValidPrice(string word)
    {
        if (word.Length < 2 || word[0] != '$')
        {
            return false;
        }
        
        for (int i = 1; i < word.Length; i++)
        {
            if (!char.IsDigit(word[i]))
            {
                return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is the number of words and m is the average word length
- **Space:** O(n) for the split words array
