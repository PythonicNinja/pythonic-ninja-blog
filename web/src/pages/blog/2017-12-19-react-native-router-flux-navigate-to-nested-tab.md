---
layout: ../../layouts/PostLayout.astro
title: How to navigate to nested tab using react-native-router-flux?
date: 2017-12-19
category: react-native
tags: ['react-native', 'ios', 'android', 'mobile']
---

# Problem 😱

You would like to navigate to nested tab using `react-native-router-flux`?

---

# Solution 🤓

Lets for example use that Routes:

```html
<Scene key="intro" component={Intro} initial={true} hideNavBar={true} title="PythonicNinja"/>
<Scene key="tabbar" tabs={true} hideNavBar={false} tabBarStyle={styles.navigationTabBar} hideBackImage={true}>
  <Scene key="Home" component={Home} {...defaultTabProps} initial={true}/>
  <Scene key="Shows" component={Shows} {...defaultTabProps}/>
  <Scene key="Channels" component={Channels} {...defaultTabProps}/>
  <Scene key="My Account" component={MyAccount} {...defaultTabProps}/>
</Scene>
```

## Usage 📱

```javascript
finishAccount = () => {
    Actions.tabbar({type: 'reset'});
    Actions['My Account']();
};
```

It will navigate to My Account component within tabbar.
