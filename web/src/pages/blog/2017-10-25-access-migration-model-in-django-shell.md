---
layout: ../../layouts/PostLayout.astro
title: How to access migration model from django shell?
date: 2017-10-25
category: django
tags: ['python', 'django', 'migrations']
---

# Problem 😱

You want to query migrations model from django.

---

# Solution 🤓

```python

>>> from django.db.migrations.recorder import MigrationRecorder

>>> MigrationRecorder.Migration.objects.all()
<QuerySet [<Migration: Migration 0001_initial for contenttypes>, <Migration: Migration 0002_remove_content_type_name for contenttypes>, <Migration: Migration 0001_initial for auth>, <Migration: Migration 0002_alter_permission_name_max_length for auth>, <Migration: Migration 0003_alter_user_email_max_length for auth>, <Migration: Migration 0004_alter_user_username_opts for auth>, <Migration: Migration 0005_alter_user_last_login_null for auth>, <Migration: Migration 0006_require_contenttypes_0002 for auth>, <Migration: Migration 0007_alter_validators_add_error_messages for auth>, <Migration: Migration 0001_initial for socore>, <Migration: Migration 0001_initial for admin>, <Migration: Migration 0002_logentry_remove_auto_add for admin>, <Migration: Migration 0001_initial for analytics>, <Migration: Migration 0002_analytic_events for analytics>, <Migration: Migration 0001_initial for default>, <Migration: Migration 0002_add_related_name for default>, <Migration: Migration 0003_alter_email_max_length for default>, <Migration: Migration 0004_auto_20160423_0400 for default>, <Migration: Migration 0001_initial for sites>, <Migration: Migration 0001_initial for django_comments>, '...(remaining elements truncated)...']>

```

# 🎉🎉🎉
