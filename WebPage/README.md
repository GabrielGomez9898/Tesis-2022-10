# Visión Civil web app
This section of the repository contains all the source code of the web app that is meant to be used by the functionaries of the government. The web app works with a serverless model, where some Google Firebase Functions are used as the Back-end of the web app.

## **The technology stack**

### **Front-end**
* Front-end framework: **`react@17.0.2`**
* State management: **`reduxjs/toolkit@1.7.2`**
* Request handling: **`axios@0.26.0`**
* Authentication and pagination: **`firebase@9.6.7`**
* Maps: **`google-maps-react@2.0.6`**
* Routing: **`react-router-dom@6.2.1`**
* Charts: **`recharts@2.1.9`**
* Tooltips: **`react-tooltip@4.2.21`**
* Loading spinners: **`react-spinners@0.11.0`**
* Styles: **`sass@1.49.7`**

> You can check the full list of dependencies for the Front-end on [the package.json from the Front-end section](front-end/vision-civil/package.json)

### **Back-end**
* Firebase functions: **`firebase-functions@3.18.1`**
* Back-end framework: **`express@4.17.3`**
* Cross-origin resource sharing: **`cors@2.8.5`**
* Managing Firebase authenticated users: **`firebase-admin@10.0.2`**
* DB integration: **`google-cloud/firestore@5.0.2`**

> You can check the full list of dependencies for the Back-end on [the package.json from the Cloud section](Cloud/package.json)

## **Run the project from a development point of view**
> In order to access the web app from a production point of view open your favorite browser and go to ***miproyecto-5cf83.web.app***

If you have already worked with the project and have already setup the Firebase CLI then [skip the below section](#running-and-testing-the-firebase-functions).

### **Setting up Firebase CLI on your local machine**
In order to run and test the Firebase Functions you have written you will need to follow the next steps:

1. Go to `Tesis-2022-10/WebPage/Cloud/`
2. Install all the dependencies of the project by typing `npm install`
3. In order to use the Firebase CLI you will need to install Firebase Tools globally on your system by typing `npm install -g firebase-tools`
4. Ask the proprietary of the Firebase app to give you proprietary privileges. If you don't have the privileges you are not going to be able to test or redeploy the functions.
5. Once you have the privileges you need to login by typing: `firebase login`
6. The Firebase CLI will open a browser tab where you need to follow the steps to login with the user that has the privileges.

### **Running and testing the Firebase Functions**
You can test your recently written functions in 2 ways. The first way is to use the firebase emulator which will run the Firebase Functions project locally on localhost. The second way is to deploy the functions which will make all the functions available to consume by the specified IP adresses (CORS must be enabled both on the Functions code and the Google Cloud Platform console). 

> At this point you must already have enabled CORS in order to consume the functions from anywhere, keep in mind that if you're using the Front-end to send the requests and test the functions then an error will occur notifying you that, so you must enable it.

#### **Running the Firebase Emulator**
1. type `firebase serve` or `firebase emulators:start --only functions`
2. Once the emulator is running copy and paste the url of the function that you want to try and use a client application such as Postman or the Front-end application to send a request that will be handled by the function. 

#### **Deploying the functions (Back-end deployment)**
1. type `firebase deploy` or `firebase deploy --only functions`
2. Once the functions are deployed copy and paste the url of the function that you want to try and use a client application such as Postman or the Front-end application to send a request that will be handle by the function.

After the emulator is running or the functions are deployed, any request handling message or error will be displayed on the editor console that your using with the Firebase Functions project each time a request is sent to the server.

### **Running the client side application**

If you have already worked with the project and have all the Node modules that the Front-end application requires [skip the below section](#running-the-react-application).

#### **Preparing the Node environment and installing modules**

1. Install all the required modules by typing `npm install`

#### **Running the React application**

Run the React application by typing `npm start`. 

> The application will run on port **3000**.

#### **Deploying the client side application (Front-end deployment)**
In order to deploy the client side application you will need to have installed Firebase Tools globally on your system. The command used for installing Firebase Tools is showed in a previous section.

1. Install all the node dependencies by typing `npm install`
2. Prepare a npm build to be used in production by typing `npm run build`
3. Deploy the client side application by typing `firebase deploy`
