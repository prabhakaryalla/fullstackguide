export interface TagDefinition {
  id: string
  label: string
  // Single significant words only (4+ chars) — reused directly against
  // getRelatedTopicsKeywordIndex()'s existing per-topic word sets.
  keywords: string[]
  // Distinct keyword hits required before this tag applies. Defaults to 1;
  // raise it for tags whose remaining keywords can appear as an incidental
  // analogy in unrelated topics (e.g. a single "database" mention).
  minMatches?: number
}

export const TAG_DEFINITIONS: readonly TagDefinition[] = [
  { id: 'caching', label: 'Caching', keywords: ['cache', 'caching', 'redis', 'memcached', 'eviction'] },
  { id: 'security', label: 'Security', keywords: ['security', 'encryption', 'vulnerability', 'owasp'] },
  { id: 'authentication', label: 'Authentication', keywords: ['authentication', 'oauth', 'saml', 'login', 'token'] },
  { id: 'concurrency', label: 'Concurrency', keywords: ['concurrency', 'thread', 'threading', 'mutex', 'deadlock', 'semaphore', 'async'] },
  { id: 'distributed-systems', label: 'Distributed Systems', keywords: ['distributed', 'consensus', 'replication', 'quorum'] },
  { id: 'databases', label: 'Databases', keywords: ['database', 'databases', 'indexing', 'transaction', 'schema'], minMatches: 2 },
  { id: 'networking', label: 'Networking', keywords: ['network', 'networking', 'socket', 'latency', 'bandwidth', 'protocol'] },
  { id: 'messaging', label: 'Messaging & Queues', keywords: ['kafka', 'messaging', 'broker', 'pubsub'] },
  { id: 'scalability', label: 'Scalability & Performance', keywords: ['scalability', 'scalable', 'throughput', 'performance', 'balancing'] },
  { id: 'testing', label: 'Testing', keywords: ['testing', 'mock', 'mocking', 'assertion', 'unittest'] },
  { id: 'design-patterns', label: 'Design Patterns', keywords: ['pattern', 'patterns', 'singleton', 'factory', 'observer', 'decorator', 'adapter'] },
  { id: 'cloud', label: 'Cloud & Infrastructure', keywords: ['cloud', 'azure', 'kubernetes', 'docker', 'container', 'serverless'] },
  { id: 'algorithms', label: 'Algorithms', keywords: ['algorithm', 'algorithms', 'sorting', 'recursion', 'traversal'] },
  { id: 'data-structures', label: 'Data Structures', keywords: ['linked', 'stack', 'tree', 'graph', 'heap', 'hashmap'] },
  { id: 'apis', label: 'APIs', keywords: ['endpoint', 'restful', 'graphql', 'swagger'] },
  { id: 'microservices', label: 'Microservices', keywords: ['microservice', 'microservices', 'gateway', 'saga', 'resilience'] },
  { id: 'storage', label: 'Storage', keywords: ['storage', 'blob', 'filesystem'] },
  { id: 'monitoring', label: 'Monitoring & Observability', keywords: ['monitoring', 'logging', 'metrics', 'tracing', 'telemetry', 'observability'] },
  { id: 'error-handling', label: 'Error Handling', keywords: ['exception', 'exceptions', 'retry', 'fallback'] },
]
