# 1364. Number of Trusted Contacts of a Customer

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Customers`, `Contacts`, and `Invoices` tables, write a query that reports, for each invoice, the customer's name and invoice price, the total number of contacts they have, and how many of those contacts are also registered customers with a matching name and email ("trusted" contacts).

### Schema

```
Customers: customer_id (PK), customer_name, email
Contacts: user_id, contact_name, contact_email
Invoices: invoice_id (PK), price, user_id
```

## Approach

Join invoices to the customer placing the order, then left-join the customer's contacts to count them, and further left-join each contact against the `Customers` table on both name and email to identify which contacts are themselves trusted customers.

## SQL Solution

```sql
SELECT i.invoice_id, c.customer_name, i.price,
       COUNT(ct.contact_name) AS contacts_cnt,
       COUNT(trusted.customer_name) AS trusted_contacts_cnt
FROM Invoices i
JOIN Customers c ON i.user_id = c.customer_id
LEFT JOIN Contacts ct ON ct.user_id = i.user_id
LEFT JOIN Customers trusted
    ON trusted.email = ct.contact_email AND trusted.customer_name = ct.contact_name
GROUP BY i.invoice_id, c.customer_name, i.price
ORDER BY i.invoice_id;
```

## Complexity

- **Time:** `O(n)` for the joins and aggregation.
- **Space:** `O(n)` for the result set.
