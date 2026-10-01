# SignalR: Real-Time Communication in .NET

SignalR abstracts real-time, bidirectional communication between server and client — automatically choosing the best available transport (WebSockets, Server-Sent Events, or long polling) and falling back gracefully when a client/network doesn't support the preferred one.

## Short Answer

SignalR lets a server push data to connected clients immediately, as events happen, instead of clients having to repeatedly poll an API for updates. It organizes connections around **Hubs** (a class exposing methods clients can call, and from which the server can call methods on clients), and automatically negotiates the best transport available, degrading from WebSockets down to Server-Sent Events or long polling as needed without any extra code.

## Defining a Hub

```csharp
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        // Broadcast to EVERY connected client
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "GeneralChat");
        await base.OnConnectedAsync();
    }
}

// Program.cs
builder.Services.AddSignalR();
app.MapHub<ChatHub>("/chatHub");
```

- A Hub method (`SendMessage`) is called by a connected client, and can, in turn, call methods on any connected client(s) — `Clients.All`, `Clients.Caller` (just the invoking client), `Clients.Group("name")` (a specific subset), or `Clients.User("id")` (a specific authenticated user) all target different audiences for the pushed message.
- **Groups** let you organize connections logically (a chat room, a specific document being collaboratively edited) without manually tracking connection IDs yourself.

## Connecting from the Client

```typescript
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .withAutomaticReconnect()
  .build()

connection.on("ReceiveMessage", (user, message) => {
  console.log(`${user}: ${message}`)
})

await connection.start()
await connection.invoke("SendMessage", "Alice", "Hello!")
```

- `.withAutomaticReconnect()` handles transient network drops by automatically attempting to reconnect — without it, a dropped connection (a brief network blip, a server restart) requires the client to detect and manually re-establish the connection itself.

## Scaling Out: The Backplane Problem

```
Without a backplane:
  Client A connects to Server Instance 1
  Client B connects to Server Instance 2
  A message sent from Client A never reaches Client B - each server instance only
  knows about its own directly-connected clients.

With a Redis (or Azure SignalR Service) backplane:
  Server Instance 1 publishes the message to Redis
  Server Instance 2 subscribes and receives it, forwarding to its own connected clients
```

- SignalR connections are inherently **stateful, long-lived** connections tied to a specific server instance — the moment you scale to multiple server instances behind a load balancer, a message sent by a client connected to Instance 1 needs a way to reach clients connected to Instance 2.
- A **backplane** (Redis, or the managed **Azure SignalR Service**) solves this by having every server instance publish outgoing messages to a shared channel that every other instance subscribes to — without one, real-time messages simply don't reach clients connected to a different server instance in a scaled-out deployment.
- **Azure SignalR Service** goes further, offloading the actual client connections entirely to a managed service — your ASP.NET Core app only talks to Azure SignalR Service's backend API, which itself manages potentially huge numbers of concurrent client connections, removing the connection-scaling concern from your own servers entirely.

## Common Mistake

Deploying a SignalR-based app behind a load balancer with multiple server instances, without configuring a backplane — this works perfectly in local development and single-instance testing, then silently fails in production the moment traffic is spread across more than one instance, since messages simply stop reaching some subset of connected clients with no obvious error.

## Summary

SignalR provides real-time, bidirectional communication via Hubs, automatically selecting the best available transport and falling back gracefully when needed. Scaling beyond a single server instance requires a backplane (Redis, or Azure SignalR Service) so messages published from one instance reach clients connected to any other instance — a requirement that's easy to overlook until a scaled-out deployment silently breaks real-time delivery for some users.
