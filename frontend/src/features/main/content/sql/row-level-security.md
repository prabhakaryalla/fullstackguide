# Row-Level Security

Row-level security filters rows according to the current user or tenant. It provides a database-level safety boundary in addition to application checks.

### SQL Server

```sql
CREATE FUNCTION dbo.fn_tenant_predicate(@tenant_id INT)
RETURNS TABLE
AS RETURN SELECT 1 AS result WHERE @tenant_id = CAST(SESSION_CONTEXT(N'tenant_id') AS INT);

CREATE SECURITY POLICY tenant_orders_policy
ADD FILTER PREDICATE dbo.fn_tenant_predicate(tenant_id) ON dbo.orders;
```

### PostgreSQL

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_orders_policy ON orders
USING (tenant_id = current_setting('app.tenant_id')::int);
```

SQL Server pairs a security policy with an inline table-valued predicate function. PostgreSQL enables row-level security on the table and attaches a policy directly. Always test reads, writes, administrative accounts, background jobs, and connection-pool context carefully.

## Tricky / Follow-up Questions

**Q: Is row-level security a replacement for authorization in the application?**

**A:** No. It is defense in depth. The application still needs authentication, business authorization, and correct tenant context management.