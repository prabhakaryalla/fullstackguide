# Mediator Pattern

The Mediator pattern centralizes communication between a set of objects into one dedicated "mediator" object, so those objects never reference each other directly — replacing a tangled web of many-to-many dependencies with one clear, central coordination point.

## Short Answer

Instead of components (or handlers, or modules) calling each other directly — creating a dense, hard-to-follow web of dependencies — every component talks only to a Mediator, which knows how to route/coordinate the interaction. Components become decoupled from each other, only coupled to the mediator itself.

## The Problem Without Mediator

```csharp
class ChatUser
{
    public void SendMessage(string message, ChatUser recipient) => recipient.Receive(message);
    // If every user needs to know about every other user directly, this becomes an
    // ever-growing web of direct references as the number of users grows.
}
```

## Applying Mediator

```csharp
public interface IChatMediator
{
    void SendMessage(string message, ChatUser sender);
    void Register(ChatUser user);
}

public class ChatRoom : IChatMediator
{
    private readonly List<ChatUser> _users = new();
    public void Register(ChatUser user) => _users.Add(user);

    public void SendMessage(string message, ChatUser sender)
    {
        foreach (var user in _users.Where(u => u != sender))
        {
            user.Receive($"{sender.Name}: {message}");
        }
    }
}

public class ChatUser
{
    public string Name { get; }
    private readonly IChatMediator _mediator;

    public ChatUser(string name, IChatMediator mediator)
    {
        Name = name;
        _mediator = mediator;
        _mediator.Register(this);
    }

    public void Send(string message) => _mediator.SendMessage(message, this);
    public void Receive(string message) => Console.WriteLine($"[{Name} received] {message}");
}

var chatRoom = new ChatRoom();
var alice = new ChatUser("Alice", chatRoom);
var bob = new ChatUser("Bob", chatRoom);

alice.Send("Hey Bob!"); // Bob receives it - Alice never held a direct reference to Bob
```

- `ChatUser` objects never reference each other directly — they only know about the `IChatMediator`, which handles routing messages to the right recipients.
- Adding a new kind of interaction (e.g. private messages, typing indicators) means changing the mediator's logic — individual `ChatUser` objects stay simple and don't need to know about every other user or every kind of interaction.

## Mediator vs Observer: Don't Confuse Them

- **Observer** is about one subject broadcasting a change to many independent, possibly-unrelated observers — the subject doesn't know or care what observers do with the notification.
- **Mediator** is about coordinating interaction *between* a set of peer objects that need to communicate with each other, in a way that could otherwise require many-to-many direct references — the mediator often actively directs *how* they interact, not just broadcasts.

## When to Use It

- A set of objects need to communicate with each other, and direct references between all of them would create a dense, hard-to-maintain web of dependencies (`N` objects each referencing `N-1` others).
- You want to centralize and control interaction logic (routing, validation, sequencing) in one place, rather than scattering it across every participant.

## Common Mistake

Letting the Mediator itself grow into an unmanageable "god object" containing all the system's business logic, simply because every interaction routes through it. The mediator should coordinate interactions between the components — the components themselves should still own their own internal behavior, not delegate everything to the mediator.

## Summary

Mediator centralizes communication between a group of related objects into one coordinator, replacing direct many-to-many references between them with a single point of coordination. It reduces coupling between the individual participants at the cost of concentrating coordination logic in one place — which needs to be kept focused on routing/coordinating, not absorbing every participant's own responsibilities.
