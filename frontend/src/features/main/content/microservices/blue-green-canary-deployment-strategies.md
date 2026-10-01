# Blue-Green and Canary Deployment Strategies

Rolling out a new version to production is inherently risky — blue-green and canary deployments are two different strategies for reducing that risk, by controlling exactly how much traffic reaches new code before you're confident it's safe.

## Short Answer

**Blue-green** keeps two complete, identical production environments ("blue" = current live version, "green" = new version); you deploy fully to the idle one, verify it, then switch all traffic over instantly — with an equally instant rollback by switching back. **Canary** takes the opposite approach: route a small percentage of real traffic to the new version alongside the old one, watch its metrics closely, and gradually increase that percentage (or roll back) based on what you observe.

## Blue-Green Deployment

1. "Blue" is the current live environment, serving 100% of traffic.
2. Deploy the new version entirely to "green" — an identical, isolated environment, receiving zero production traffic yet.
3. Run smoke tests / synthetic checks against green directly.
4. Switch the load balancer/router to send all traffic to green — this is typically an instant, all-or-nothing cutover.
5. Keep blue running, untouched, for a period — if something's wrong with green, switch back instantly (an equally fast rollback).

- **Strength:** rollback is essentially instant — flip the router back, no redeploy needed, since the old version is still fully running and untouched.
- **Weakness:** requires running two full production-sized environments simultaneously (at least during the cutover window), which costs real infrastructure money. It's also all-or-nothing — a subtle bug that only manifests under a fraction of real traffic patterns might not surface in smoke tests before the full switch.
- **Database migrations are the hard part** — both blue and green typically share one database, so schema changes need to be backward-compatible with *both* versions during the transition (see [zero-downtime schema migrations](../sql/zero-downtime-migrations.md)).

## Canary Deployment

```csharp
// Example: routing 5% of traffic to the canary version via a feature-flag/traffic-splitting service
if (_trafficSplitter.ShouldRouteToCanary(userId, canaryPercentage: 5))
{
    return await _canaryOrderService.PlaceOrderAsync(request); // new version
}
return await _stableOrderService.PlaceOrderAsync(request); // current stable version
```

1. Deploy the new version alongside the current one, but route only a small slice of real traffic to it (e.g. 5%).
2. Closely monitor the canary's error rate, latency, and business metrics against the stable version's baseline.
3. If healthy, gradually increase the canary's traffic share (5% → 25% → 50% → 100%); if not, roll back by routing traffic away from it.
4. Once at 100%, the canary effectively *becomes* the new stable version.

- **Strength:** limits the blast radius of a bad deploy — if something's wrong, only a small fraction of real users are affected, and you find out from real production signals, not just synthetic pre-release tests.
- **Weakness:** requires solid observability (you need to actually be able to tell, quickly and confidently, whether the canary is healthy) and takes longer overall than an instant blue-green cutover — it's inherently a gradual, monitored process rather than a single switch.
- **Requires infrastructure support** — a service mesh (Istio, Linkerd), an API gateway with weighted routing, or a feature-flagging system capable of splitting traffic by percentage.

## Choosing Between Them

| | Blue-Green | Canary |
|---|---|---|
| Rollback speed | Instant (flip router back) | Gradual (traffic already at partial exposure by the time an issue is caught) |
| Blast radius if something's wrong | 100% of traffic, briefly, until switched back | Limited to the canary's traffic percentage |
| Infrastructure cost | Two full environments during cutover | One environment, incremental traffic splitting |
| Best for | Environments where instant, guaranteed rollback matters most, and infra duplication is affordable | Systems with strong observability, wanting real production signal before full rollout |

They're not mutually exclusive — many organizations canary a release first (to catch obvious issues on a small slice of traffic), then use blue-green-style instant rollback capability as the final safety net once fully rolled out.

## Common Mistake

Treating either strategy as a substitute for good automated testing and staging environments. Both are risk-*reduction* strategies for the inherent uncertainty of real production traffic — they're not meant to replace catching obvious bugs before they ever reach a canary or a green environment in the first place.

## Summary

Blue-green trades higher infrastructure cost for an instant, all-or-nothing cutover with equally instant rollback. Canary trades a longer, more gradual rollout for a much smaller blast radius if something goes wrong, at the cost of needing solid real-time observability to judge the canary's health. Both exist to reduce the risk of a production deployment, not to eliminate the need for testing before one.
