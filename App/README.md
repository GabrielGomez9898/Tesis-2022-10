# Visión Civil mobile app

This section of the repository contains all the source code of the mobile app that is meant to be used by the citizens and the local police authorities. The mobile app was built using the BloC pattern, working under an a serverless arquitecture using Firebase Functions calls as the Back-end of the mobile app.

## **APK File**


## **Important Dependencies**
* **`cloud_firestore@1.0.0`**
* **`firebase_auth@1.0.0`**
* **`firebase_core@1.14.0`**
* **`firebase_storage@10.2.7`**
* **`equatable@2.0.3`**
* **`meta@1.3.0`**
* **`provider@6.0.0`**
* **`flutter_bloc@8.0.1`**
* **`google_maps_flutter@2.1.1`**
* **`location@4.2.0`**


## **Compatibility**
Vision Civil app works in IOS :heavy_check_mark: and Android :heavy_check_mark:

* **Permissions**:
  * Location
  * Camera
  * Gallery
  * Video
  * Phone contacts
  * SMS

### **IOS Features :green_apple:**                                                       
* **Version**: From version 10 onwards


### **Android Features :alien:** 
* **Compile SDK Version**: 31
* **Min SDK Version**: 21


## **The technology stack**

### **Framework Features**
* Flutter: **`Flutter@2.10.1`**
* Programming Language: **`Dart@2.16.1`**
* Tools: **`Dart@2.16.1`**

## **Run the project from a development point of view**
The first thing you should do is to have installed Flutter in your computer. Once you have installed Flutter in your computer, you should install the dart package in your IDE.

To make sure you have all the Flutter settings up to date, run the following command: **`flutter doctor`**

### **Run App - Android**
You have two choices for running the app, with an Android simulator or with a phyisical device. If your choice is physical device please follow the steps (VS Code):
* On terminal, go to the root path of the project
* Update flutter dependencies and packages, run the command: **`flutter pub get`**
* Plug your device to your computer: :iphone: :computer:
* Open de VS nav bar:   **`Ctrl + shift + p`**
* Select: **`Flutter: Select Device`** and then click on your device of preference, make sure VS is recognizing your device. PD: Running the command **`flutter doctor`** also will tell you if your device is ready for running the app
* Go to the file main.dart and click on the play button :play_or_pause_button: and that's it! the app will be running on your device! :heavy_check_mark:

### **Run App - IOS**
Before following the steps, make sure have installed Xcode on your mac. You have two choices for running the app, with an IOS simulator or with a phyisical device. If your choice is physical device please follow the steps (Xcode):
*  On terminal, go to the path  **`/App/vision_civil/ios`**
*  Run the following command: **`pod install`**
*  Go to the ios folder of the project: **`Right click -> Open with Xcode`**
*  Click Build and run app button and that's it! the app will be running on your device! :heavy_check_mark:

