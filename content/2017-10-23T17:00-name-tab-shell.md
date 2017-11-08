Title: How to name tab in shell?
Date: 2017-10-23 17:00
Category: linux 

# Problem 😱

You have multiple shell tabs with not really nice names.

![plain shell name](https://i.imgur.com/jXKzEqT.png) 


---

# Solution 🤓

```bash
function name() { echo -ne "\\033]0;$@\\007"; }
```

usage:
```bash
| => name writing blog post
```

result:

![nice shell name](https://i.imgur.com/wI7Ax7f.png)
