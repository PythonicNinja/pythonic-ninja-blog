---
layout: ../../layouts/PostLayout.astro
title: How to find / kill process running on port?
date: 2017-10-24
category: linux
---# Problem 😱

You run your server and get:
```
s.bind((hostname, port))
OSError: [Errno 48] Address already in use
``` 

---

# Solution 🤓

```bash
| => lsof -i :your-port-num


| => lsof -i :8000
COMMAND     PID          USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
python3.5 81097 pythonicninja    4u  IPv4 0x5a7b2c523567dcd7      0t0  TCP *:irdmi (LISTEN)


| => lsof -i :8000 -t | xargs kill -9
```

function:
```bash
function fport() { lsof -i :$@; }

function kport() { lsof -i :$@ -t | xargs kill -9; }
```


usage:
```bash
| => fport 8000
COMMAND     PID          USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
python3.5 25369 pythonicninja    6u  IPv4 0x5a7b2c5216355cd7      0t0  TCP *:irdmi (LISTEN)
python3.5 25373 pythonicninja    6u  IPv4 0x5a7b2c5216355cd7      0t0  TCP *:irdmi (LISTEN)
python3.5 25373 pythonicninja    8u  IPv4 0x5a7b2c5216355cd7      0t0  TCP *:irdmi (LISTEN)

| => kport 8000
```

#🎉🎉🎉
