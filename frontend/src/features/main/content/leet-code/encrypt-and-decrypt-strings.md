# 2227. Encrypt and Decrypt Strings

**Difficulty:** Hard
**Category:** Hash Table, String, Design, Trie

## Problem

You are given a character array `keys` containing unique characters and a string array `values` containing strings of length 2. You are also given another string array `dictionary` that contains all permitted original strings.

You should implement a data structure that can encrypt or decrypt a 0-indexed string.

Implement the `Encrypter` class:
- `Encrypter(char[] keys, String[] values, String[] dictionary)` initializes the object
- `String encrypt(String word1)` encrypts `word1` with the encryption algorithm and returns the encrypted string
- `int decrypt(String word2)` returns the number of possible strings in `dictionary` that could decrypt to `word2`

### Example

```
Input: 
keys = ['a', 'b', 'c', 'd']
values = ["ei", "zf", "ei", "am"]
dictionary = ["abcd", "acbd", "adbc", "badc", "dacb", "cadb", "cbda", "abad"]

encrypt("abcd") returns "eizfeiam"
decrypt("eizfeiam") returns 2
```

## Approach

For encryption: Use a map from keys to values.

For decryption: Precompute encrypted forms of all dictionary words and count occurrences.

## C# Solution

```csharp
public class Encrypter
{
    private Dictionary<char, string> encryptMap;
    private Dictionary<string, int> encryptedCount;
    
    public Encrypter(char[] keys, string[] values, string[] dictionary)
    {
        encryptMap = new Dictionary<char, string>();
        for (int i = 0; i < keys.Length; i++)
        {
            encryptMap[keys[i]] = values[i];
        }
        
        encryptedCount = new Dictionary<string, int>();
        foreach (string word in dictionary)
        {
            string encrypted = Encrypt(word);
            encryptedCount[encrypted] = encryptedCount.GetValueOrDefault(encrypted, 0) + 1;
        }
    }
    
    public string Encrypt(string word1)
    {
        StringBuilder sb = new StringBuilder();
        
        foreach (char c in word1)
        {
            if (!encryptMap.ContainsKey(c))
            {
                return ""; // Invalid character
            }
            sb.Append(encryptMap[c]);
        }
        
        return sb.ToString();
    }
    
    public int Decrypt(string word2)
    {
        return encryptedCount.GetValueOrDefault(word2, 0);
    }
}
```

## Complexity

- **Time:** O(k) for encryption, O(1) for decryption, where k is word length
- **Space:** O(d * m), where d is dictionary size and m is average word length
