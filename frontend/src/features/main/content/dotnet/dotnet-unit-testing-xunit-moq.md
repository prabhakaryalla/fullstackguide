# .NET Unit Testing: xUnit, Moq, and the AAA Pattern

Unit testing validates the smallest testable pieces of an application in isolation. In .NET, xUnit is the most common test framework and Moq the most common mocking library, typically combined with the Arrange-Act-Assert (AAA) structure for readable tests.

## Short Answer

xUnit provides the test runner and attributes (`[Fact]`, `[Theory]`) to define test methods; Moq creates fake implementations of dependencies so a class can be tested in isolation; the AAA pattern (Arrange, Act, Assert) structures each test into three clear, readable sections.

## xUnit: Fact vs Theory

```csharp
public class MathTests
{
    [Fact] // a single, fixed test case
    public void IsEven_ReturnsTrue_ForEvenNumber()
    {
        // Arrange
        int number = 6;

        // Act
        bool result = Mathematics.IsEven(number);

        // Assert
        Assert.True(result);
    }

    [Theory] // runs the same test logic with multiple input sets
    [InlineData(1)]
    [InlineData(3)]
    [InlineData(5)]
    public void IsOdd_ReturnsTrue_ForOddNumbers(int number)
    {
        bool result = Mathematics.IsOdd(number);
        Assert.True(result);
    }
}
```

- `[Fact]` — one specific scenario, no parameters.
- `[Theory]` + `[InlineData(...)]` — the same test body run once per data row, avoiding copy-pasted near-identical test methods.

## The Arrange-Act-Assert Pattern

| Section | Purpose |
|---|---|
| **Arrange** | Set up inputs, dependencies, and any required state |
| **Act** | Execute the single method/behavior under test |
| **Assert** | Verify the actual outcome matches the expected outcome |

- Keeping these three sections visually distinct (even with comments) makes tests easy to scan and diagnose when they fail.

## Stub vs Mock

- **Stub** — a fake object that returns canned responses; used just to let the test run without needing a real dependency (e.g., a real database).
- **Mock** — goes further: it verifies *how* it was used (was it called, with what arguments, how many times) — the test asserts against the mock's recorded interactions, not just a returned value.

## Moq: Mocking Dependencies

```csharp
public interface IBookService
{
    IEnumerable<string> GetBooksForCategory(string categoryId);
}

public class AccountService
{
    private readonly IBookService _bookService;
    public AccountService(IBookService bookService) => _bookService = bookService;

    public IEnumerable<string> GetAllBooksForCategory(string categoryId) =>
        _bookService.GetBooksForCategory(categoryId);
}
```

```csharp
public class AccountServiceTests
{
    [Fact]
    public void GetAllBooksForCategory_ReturnsBooksFromBookService()
    {
        // Arrange
        var bookServiceMock = new Mock<IBookService>();
        bookServiceMock
            .Setup(x => x.GetBooksForCategory("UnitTesting"))
            .Returns(new List<string> { "The Art of Unit Testing", "Test-Driven Development" });

        var sut = new AccountService(bookServiceMock.Object); // "sut" = System Under Test

        // Act
        var result = sut.GetAllBooksForCategory("UnitTesting");

        // Assert
        Assert.Equal(2, result.Count());
        bookServiceMock.Verify(x => x.GetBooksForCategory("UnitTesting"), Times.Once); // verifies HOW it was used
    }
}
```

- `Setup(...)` defines what the fake returns for a given call signature.
- `.Object` provides the actual fake instance to inject into the class under test.
- `Verify(...)` confirms the dependency was actually called as expected — this is the "mock" part, distinguishing it from a plain stub.

## Benefits of Moq

- Fast, isolated tests — no real database, API, or file system needed.
- Easy to simulate edge cases and failures (e.g., make a dependency throw an exception) that would be hard to trigger with a real dependency.
- Verifies interactions, not just return values, catching bugs like "a method was called twice when it should only run once."

## Testing Exception Scenarios

```csharp
[Fact]
public void GetAllBooksForCategory_PropagatesException_WhenBookServiceFails()
{
    var bookServiceMock = new Mock<IBookService>();
    bookServiceMock.Setup(x => x.GetBooksForCategory(It.IsAny<string>()))
        .Throws(new InvalidOperationException("Service unavailable"));

    var sut = new AccountService(bookServiceMock.Object);

    Assert.Throws<InvalidOperationException>(() => sut.GetAllBooksForCategory("Any"));
}
```

- `It.IsAny<string>()` matches any argument value, useful when the specific input doesn't matter for that particular test case.

## Common Mistake

Testing against a real database, API, or file system in what's meant to be a "unit" test — this makes tests slow, flaky, and dependent on external state. Reserve real dependencies for integration tests, and use mocks/stubs to isolate the unit under test in true unit tests.

## Summary

xUnit provides the test execution framework (`[Fact]` for single cases, `[Theory]`/`[InlineData]` for data-driven cases), Moq provides fake dependency implementations that can both return canned data and verify how they were called, and the Arrange-Act-Assert structure keeps each test's setup, execution, and verification clearly separated and easy to read.
