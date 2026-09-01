# 578. Get Highest Answer Rate Question

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `SurveyLog` table recording `show` and `answer` actions per `question_id`, write a query to report the question with the highest answer rate (answers divided by shows).

### Schema

```
SurveyLog: id, action, question_id, answer_id, q_num, timestamp
```

## Approach

Group log entries by `question_id`, counting how many rows were `'show'` actions versus `'answer'` actions within each group. Compute the ratio of answers to shows per question, sort descending by that ratio (breaking ties by the smallest `question_id`), and take the top result.

## SQL Solution

```sql
SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY
    SUM(CASE WHEN action = 'answer' THEN 1 ELSE 0 END) / SUM(CASE WHEN action = 'show' THEN 1 ELSE 0 END) DESC,
    question_id ASC
LIMIT 1;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of distinct questions.
- **Space:** `O(n)` for the grouped intermediate result.
