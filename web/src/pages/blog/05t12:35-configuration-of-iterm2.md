---
layout: ../../layouts/PostLayout.astro
title: Configuration for productive terminal on osx.
date: 2017-11-05T11:35:00.000Z
category: osx
tags: ['osx', 'terminal', 'iterm', 'iterm2', 'shell', 'bash', 'command-line']
---# Problem 😱

You would like to have:

1. visor mode on `cmd + .`
2. support for `alt + (< | > | backspace)`

---

# Solution 🤓

Before we begin let's ensure we have iterm2:

`brew cask install iterm2`

Let's address remaining issues in step by step approach:

## 1. visor mode on `cmd + .`

- open iterm2

- open preferences 
    `cmd + ,`
    
- head to `keys` tab
    
- click `Create a dedicated Hotkey Window`

- add hotkey `cmd + .`

- check option of `floating window`

![hotkey-window-conf](https://i.imgur.com/J8tdUIo.png)


- head to profiles section again and select window tab where you will need to have following settings: 
style = `fullscreen`, screen = `screen with cursor`, space = `all spaces`

![keys](https://i.imgur.com/QjOVVV9.png)

- confirm changes and restart iterm2

Result:
   
![result](https://i.imgur.com/l9mPmpa.gif)



## 2. support for `alt + (< | > | backspace)`

iTerm > Preferences > Profiles > Keys:

- Alt + left: Send Escape Sequence, Esc + b
- Alt + right: Send Escape Sequence, Esc + f
- Alt + backspace: Send Hex Code, 0x17
