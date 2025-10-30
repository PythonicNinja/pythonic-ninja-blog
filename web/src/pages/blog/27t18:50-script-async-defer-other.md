---
title: When to use async defer or no atribute on script tag?
date: 2017-10-27T16:50:00.000Z
category: webdev
tags: ['html', 'webdev']
---# Problem 😱

You want to add script tag. But when to add specific attribute?

---

# Solution 🤓

![legend](http://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

`<script>`

Let’s start by defining what `<script>` without any attributes does. 
The HTML file will be parsed until the script file is hit, 
at that point parsing will stop and a request will be made to fetch the file (if it’s external). 
The script will then be executed before parsing is resumed.

![legend](http://www.growingwiththeweb.com/images/2014/02/26/script.svg)

`<script async>`

async downloads the file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading.


![legend](http://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)

`<script defer>`

defer downloads the file during HTML parsing and will only execute it after the parser has completed. defer scripts are also guarenteed to execute in the order that they appear in the document.

![legend](http://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)

# When should I use what?

Typically you want to use async where possible, then defer then no attribute. 


Here are some general rules to follow:

- If the script is modular and does not rely on any scripts then use async.

- If the script relies upon or is relied upon by another script then use defer.

- If the script is small and is relied upon by an async script then use an inline script with no attributes placed above the async scripts.


## References:

- [1] https://github.com/h5bp/lazyweb-requests/issues/42
- [2] http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
