Title: How to create alert in osx?
Date: 2017-10-20 01:00
Category: os admin devops 

# Problem 😱

How to create alert in osx which could be triggered via command line?


---

# Solution 🤓

```
function alert() { osascript -e 'display notification "'"$1"'" with title "'"Alert"'"' && say $1; }
```


## usage:
`alert "Wow it's so nice 🤓"`

[alert in osx](https://i.imgur.com/cStOkYe.png)
