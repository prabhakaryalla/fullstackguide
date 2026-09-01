# SOLID Principles

SOLID is a set of 5 design principles that help us write code that is easier to change, test, and maintain.

## Why SOLID Matters

- Code becomes easier to read.
- Bugs are easier to isolate.
- New features can be added with less risk.
- Unit testing becomes simpler.

## S — Single Responsibility Principle (SRP)

Definition: A class should have only one reason to change.

If a class does validation, database work, logging, and email all together, it becomes hard to maintain. Split responsibilities.

```csharp
public static class NoteValidation
{
    public const int MinContentLength = 1;
    public const int MaxContentLength = 500;

    public static bool IsValid(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
        {
            return false;
        }

        return content.Length >= MinContentLength
            && content.Length <= MaxContentLength;
    }
}
```

NoteValidation only validates note content. If validation rules change, only this class changes.

Real-world example: a cashier takes payment, while inventory staff updates stock. One person, one job.

---

## O — Open/Closed Principle (OCP)

Definition: Code should be open for extension, closed for modification.

We should add new behavior by creating new classes, not by editing stable existing logic every time.

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal price);
}

public sealed class RegularDiscount : IDiscountStrategy
{
    public decimal Apply(decimal price) => price;
}

public sealed class FestivalDiscount : IDiscountStrategy
{
    public decimal Apply(decimal price) => price * 0.9m;
}

public sealed class CheckoutService
{
    public decimal CalculateTotal(decimal price, IDiscountStrategy discount)
        => discount.Apply(price);
}
```

To add a new discount type, create a new strategy class that implements IDiscountStrategy. CheckoutService does not change.

Real-world example: adding a new payment option at a store (UPI/card/wallet) without rebuilding the billing counter.

---

## L — Liskov Substitution Principle (LSP)

Definition: A derived type should work anywhere its base type is expected.

If code expects an abstraction, every implementation should behave correctly without surprising the caller.

```csharp
public interface IConfigProvider
{
    string GetValue(string key);
}

public sealed class FileConfigProvider : IConfigProvider
{
    public string GetValue(string key) => "file-value";
}

public sealed class CloudConfigProvider : IConfigProvider
{
    public string GetValue(string key) => "cloud-value";
}

public sealed class FeatureService
{
    private readonly IConfigProvider _configProvider;

    public FeatureService(IConfigProvider configProvider)
    {
        _configProvider = configProvider;
    }

    public string ReadTheme() => _configProvider.GetValue("theme");
}
```

FeatureService works with either provider without code changes.

Real-world example: any brand of USB keyboard should work when plugged into the same USB port.

---

## I — Interface Segregation Principle (ISP)

Definition: Clients should not depend on methods they do not use.

Avoid one giant interface. Split into smaller focused interfaces.

```csharp
public interface IHealthReader
{
    string GetStatus();
}

public interface IOrderProcessor
{
    void PlaceOrder(int orderId);
}

public sealed class HealthController
{
    private readonly IHealthReader _healthReader;

    public HealthController(IHealthReader healthReader)
    {
        _healthReader = healthReader;
    }

    public string Get() => _healthReader.GetStatus();
}
```

`HealthController` depends only on health methods, not order-related methods.

Real-world example: a TV remote has separate buttons for volume and channels. You do not need all buttons to just change volume.

---

## D — Dependency Inversion Principle (DIP)

Definition: High-level modules should depend on abstractions, not concrete classes.

Business logic should not create low-level classes directly with new. Use interfaces and dependency injection.

```csharp
public interface IEmailService
{
    void Send(string to, string subject, string body);
}

public sealed class UserNotificationManager
{
    private readonly IEmailService _emailService;

    public UserNotificationManager(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public void SendWelcome(string email)
    {
        _emailService.Send(email, "Welcome", "Your account is ready.");
    }
}
```

UserNotificationManager depends on IEmailService, so the implementation can be swapped for SMTP, SendGrid, or a test mock.

Real-world example: a wall socket is a standard interface. You can plug in a laptop charger, phone charger, or lamp without changing the wall wiring.

---

## Quick Recap Table

| Principle | Meaning | Key Benefit |
|:---|:---|:---|
| S | One class, one job | Easier maintenance |
| O | Extend without modifying stable code | Safer feature additions |
| L | Implementations can be replaced safely | Predictable behavior |
| I | Small, focused interfaces | Less unnecessary coupling |
| D | Depend on interfaces | Better testability and flexibility |

