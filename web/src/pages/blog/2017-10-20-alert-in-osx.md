---
layout: ../../layouts/PostLayout.astro
title: How to create alert in osx?
date: 2017-10-20
category: osx
tags: ['alert', 'shell', 'linux', 'osx', 'apple', 'mac']
---

# Problem 😱

How to create alert in osx which could be triggered via command line?


---

# Solution 🤓

```
function alert() { osascript -e 'display notification "'"$1"'" with title "'"Alert"'"' && say $1; }
```


## Usage:
```
alert "Wow it's so nice 🤓"
```

![alert in osx](https://i.imgur.com/cStOkYe.png)
