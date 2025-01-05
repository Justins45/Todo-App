# Todo App

Todo App by [Justin Shaw](https://www.justinshaw.ca/).

This app uses [Capacitor](https://capacitorjs.com/) to create a build of the vue web pages and turns them into an app for both Android and IOS.

## Table of Contents

- [IDE Setup](#ide-setup)
- [System Requiremtns](#system-requirements)
- [Project Setup](#project-setup)
- [Link Vue Build to IOS and Android (Capacitor)](#link-vue-build-to-ios-and-android-capacitor)
- [Run Ios / Xcode](#xcode-ios)
- [Run Android / Android Studio](#android-studio)
- [Custom scripts](#custom-scripts)

## IDE Setup

- [VsCode](https://code.visualstudio.com/)
- Extensions Used and recomended
  - [Vue - Offical](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## System Requirements

- Xcode

  - [Xcode v15.0+](https://developer.apple.com/download/all/) is a `Mac only` and is required to run `IOS 13+`- Detailed instructions that I used can be found here at [freecodecamp.org - how to install xcode](https://www.freecodecamp.org/news/how-to-download-and-install-xcode/).
  - Capasitor requireds [CocoaPods](https://cocoapods.org/) to to run and manage native IOS elements. Capcitor and CocoaPods install instructions are here on Capacitors website [Capasitor Enviorment Setup - CocoaPods](https://capacitorjs.com/docs/getting-started/environment-setup#cocoapods).

- Android Studio
  - [Android studio](https://developer.android.com/studio) is required to run `Android 5-6 and 10+`. on Android 7-9 Google Chrome provides a WebView.
  - Capacitor uses Android WebView with Chrome 60 or later.
  - More Infromation can be found at [Capasitor Enviorment Setup - Android](https://capacitorjs.com/docs/android)

## Project Setup

```sh
npm install
```

## Link Vue build to IOS and Android (Capacitor)

### Step 1

```sh
npm run build
```

### Step 2

```sh
npx cap sync
```

### Run local for app Development

```sh
npm run dev
```

## Xcode (IOS)

More Detailed Instructions for IOS setup can be found on capacitors website [Get Started with IOS](https://capacitorjs.com/docs/ios)

### Open in Xcode

```sh
npx cap open ios
```

### Run IOS Emulator

```sh
npx cap run ios
```

## Android Studio

More Detailed Instructions for Android setup can be found on capacitors website [Get Started with Android](https://capacitorjs.com/docs/android)

### Open in Android Studio

```sh
npx cap open Android
```

### Run Android Emulator

```sh
npx cap run Android
```

## Custom Scripts

These scripts are ment to make life a little easier for developers to allow for smoother coding and development.

There is no requiremnt to use these scrips as they are just shortcuts for the scripts above.

**!! These scrips are for this project only !!**
