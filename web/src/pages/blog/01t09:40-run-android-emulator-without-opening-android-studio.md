---
title: How to run android emulator without opening Android Studio?
date: 2018-03-01T08:40:00.000Z
category: android
tags: ['android', 'linux', 'tips', 'react-native']
---# Problem 😱

You would like to run android_emulator from shell:

```
=> android_emulator
```

---

# Solution 🤓

Add alias to your `bash_profile`:
```
alias android_emulator='cd $ANDROID_HOME/tools && emulator @Nexus_5X_API_25'
```

> Adjust part of `@Nexus_5X_API_25` to your needs 

Listing available emulators on your device:

> `android list avd`

```
    Name: Nexus_5X_API_25
  Device: Nexus 5X (Google)
    Path: /Users/pythonicninja/.android/avd/Nexus_5X_API_25.avd
  Target: Google Play (Google Inc.)
          Based on: Android 7.1.1 (Nougat) Tag/ABI: google_apis_playstore/x86
    Skin: nexus_5x
  Sdcard: 100M
```
