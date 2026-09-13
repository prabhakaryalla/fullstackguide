# SQL Injection Prevention

SQL injection happens when user input is accidentally treated as part of a SQL command. Parameters keep user values separate from the SQL command.

```sql
SELECT customer_id, customer_name
FROM customers
WHERE email = :email;
```

The application sends `:email` as a value instead of joining it into a string. Use prepared statements or a trusted query builder. Allow only known sort-column names, give the database account limited permissions, and do not rely only on escaping.

## Tricky Interview Questions

**Q: Do parameters protect a dynamic table or column name?**

**A:** Usually no. Parameters protect values, not SQL identifiers. Use an allow-list for table names, column names, and sort directions.