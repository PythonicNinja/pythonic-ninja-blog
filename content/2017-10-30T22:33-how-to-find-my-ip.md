Title: How to find my external ip in shell?
Date: 2017-10-30 22:33
Category: linux
Tags: linux, ip, shell, bash

# Problem 😱

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
