---
title: How to fetch only headers using curl?
date: 2017-11-08T13:42:00.000Z
category: linux
tags: ['terminal', 'shell', 'bash', 'command-line', 'linux', 'curl']
---# Problem 😱

You would like to have get only headers from request.

---

# Solution 🤓

We will use `curl` command to achieve it:

```bash
| => curl --help | grep "\-I,"
 -I, --head          Show document info only
```

usage:
```bash
| => curl -I http://pythonic.ninja
HTTP/1.1 200 OK
Server: GitHub.com
Date: Wed, 08 Nov 2017 13:44:25 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 10556
Last-Modified: Sun, 05 Nov 2017 11:48:59 GMT
Access-Control-Allow-Origin: *
Expires: Wed, 08 Nov 2017 13:54:25 GMT
Cache-Control: max-age=600
Accept-Ranges: bytes
X-GitHub-Request-Id: FF40:288D5:B312F9:F94B6E:5A030A39
```


