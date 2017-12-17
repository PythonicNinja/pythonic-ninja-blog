Title: How to run react-native packager on different port?
Date: 2017-12-17 19:31
Category: react-native
Tags: react-native, ios, android, mobile 

# Problem 😱

You have some program running on react-native default port.

---

# Solution 🤓

You will need to run packager with following port:

```bash
yarn start --port 8085
```

## iOS 📱

In your xcode open `project_dir/ios/project.xcodeproj`.
Change following line `Libraries/React.xcode.proj/React/Base RCTBundleURLProvider.m` 
```bash
const NSUInteger kRCTBundleURLProviderDefaultPort = 8085;
```

## Android 🤖

On android emulator press `cmd + m`.
Dev Settings -> Debug server host & port for device -> `localhost:8085`.
