---
title: How to find my external ip in shell?
date: 2017-10-30T21:33:00.000Z
category: linux
tags: ['linux', 'ip', 'shell', 'bash']
---# Problem 😱

You want to get your external ip?

---

# Solution 🤓

alias:

`alias myip='curl ipinfo.io'`

usage:

```bash
| => myip
{
  "ip": "0.0.0.0",
  "hostname": "dd.dynamic.chello.pl",
  "city": "Sopot",
  "region": "Sopot",
  "country": "PL",
  "loc": "dd,dd",
  "org": "AS6830 Liberty Global Operations B.V."
}
```
