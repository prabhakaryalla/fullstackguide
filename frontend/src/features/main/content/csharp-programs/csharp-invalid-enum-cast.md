# Casting Invalid Values to an Enum

C# enums are just named integers under the hood — the compiler doesn't stop you from casting a value that has no matching name at all, and no exception is thrown when you do.

## The Question

```csharp
enum Status
{
    Pending = 0,
    Active = 1,
    Closed = 2
}

Status s = (Status)99;
Console.WriteLine(s); // Output?
```

**Output:** `99`

Not an exception, not `Status.Pending` — just the literal number, printed because there's no matching name to display.

## Why This Happens

- An `enum` in C# is a thin, named wrapper around an underlying integral type (`int` by default). Casting an integer to an enum type is just a numeric conversion — the compiler checks that the underlying types are compatible, not that the specific value corresponds to a defined member.
- `ToString()` on an enum looks up a matching name for the stored value; if none exists, it just falls back to printing the raw numeric value instead of throwing.
- This means `(Status)99` is a perfectly "successful" cast at both compile time and run time — the resulting `Status` value is simply not one of the three named members.

## Where This Bites People

```csharp
public void Process(Status status)
{
    switch (status)
    {
        case Status.Pending: DoPending(); break;
        case Status.Active: DoActive(); break;
        case Status.Closed: DoClosed(); break;
        // no default case - "impossible" to reach, right?
    }
}

Process((Status)99); // compiles, runs, does absolutely nothing - no case matches, no error
```

A `switch` over an enum that omits a `default` case, assuming "the enum can only ever be one of its defined values," silently does nothing for any out-of-range value — a value that's very easy to produce accidentally: a bad cast from user input, a stale integer from a database after enum members were removed, or a value from an external API that doesn't validate against your enum definition.

## Checking Validity Explicitly

```csharp
Status s = (Status)99;
Console.WriteLine(Enum.IsDefined(typeof(Status), s)); // False

if (!Enum.IsDefined(typeof(Status), s))
{
    throw new ArgumentOutOfRangeException(nameof(s), s, "Unknown status value.");
}
```

- `Enum.IsDefined` (or the generic `Enum.IsDefined<Status>(s)` in newer .NET versions) is the explicit check the language doesn't perform for you automatically.
- Always add a `default:` case to switches over enum values that might come from outside your own code's control (deserialization, casts from raw integers, external APIs) — never assume the enum's declared members are the only possible runtime values.

## Common Mistake

Treating an enum type as if it were a closed, exhaustively-checked set of values, the way a proper sum type / discriminated union would be. C# enums provide naming and IntelliSense convenience, not a runtime guarantee — any integer of the right underlying type is a "valid" enum value as far as the CLR is concerned.

## Summary

Casting an out-of-range integer to an enum always succeeds silently — there's no built-in validation, and `ToString()` just prints the raw number when no name matches. Use `Enum.IsDefined` (or explicit range/allow-list checks for `[Flags]` enums) whenever an enum value could plausibly come from outside your own strictly-controlled code, and always include a `default` case in switches over enum values from external sources.
