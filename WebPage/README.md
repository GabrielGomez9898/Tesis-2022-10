# Visión Civil web app
This section of the repository contains all the source code of the web app that is meant to be used by the functionaries of the government. The web app works with a serverless model, where Google Firebase Functions are used as the Back-end of the web app.

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

> You can check the full list of dependencies for the Back-end on [the package.json from the Back-end section](Cloud/package.json)

## **Run the project from a development point of view**
> In order to access the web app from a production point of view open your favorite browser and go to ***www.visioncivil.com***

### **Setting Up Firebase CLI on your local machine**
In order to run and test the Firebase functions you have written you will need to follow the next steps:

1. Go to `Tesis-2022-10/WebPage/Cloud/`
2. Install all the dependencies of the project by typing `npm install`
3. In order to use the Firebase CLI you will need to install Firebase Tools globally on your system by typing `npm install -g firebase-tools`
4. Ask the proprietary of the Firebase app to give you proprietary privileges. If you don't have the privileges you are not going to be able to test or redeploy the functions.
5. Once you have the privileges you need to login: `firebase login`
6. The Firebase CLI will open a browser tab where you need to folow the steps to login with the user that has the privileges.

### **Running and testing the Firebase Functions**
You can test your recently written functions in 2 ways. The first way is to use the firebase emulator which will run the Firebase Functions project locally on localhost. The second way is to deploy the functions which will make all the functions available to consume by the specified IP adresses. 

#### **Running the Firebase Emulator**
1. type `firebase serve` or `firebase emulators:start --only functions`

#### **Deploying the functions**
1. type `firebase deploy` or `firebase deploy --only functions`

If you have already worked with the project and have all the Python modules that the project requires [skip the below section](#starting-the-development-server).

#### **Preparing your Node environment and installing modules**

1. Go to `Tesis-2022-10/WebPage/back-end/vision-civil/`
2. Either create a Virtual Environment using `py -m venv .venv` or just skip step **2** and step **3** and download all the modules directly to your default Virtual Environment
3. Activate the Virtual Environment that you just have created going to `.venv/Scripts/` and typing `activate`
4. Install all the following modules with the Virtual Environment activated:
    * Type `pip install Django`
    * Type `pip install firebase-admin`
    * Type `pip install django-cors-headers`
5. Go back to `Tesis-2022-10/WebPage/back-end/vision-civil/`

#### **Starting the development server**

Start the development server by typing `py manage.py runserver` or if you want to run the server in a different port than port **8000** run `py manage.py runserver <your desired port number>`

After completing all the steps and while the server is running, any request handling message or error will be displayed on the console each time a request is sent to the server.

### **Running the client side application**

If you have already worked with the project and have all the Node modules that the project requires [skip the below section](#running-the-react-application).

#### **Preparing the Node environment and installing modules**

1. Install all the required modules by typing `npm install`

#### **Running the React application**

Run the React application by typing `npm start`. The application will run on port **3000**.

> If you want to test each endpoint (aka view in Django) individually, without having to run the client side application, write an email to ***dankramirez@outlook.com*** asking for each resource URI and the reason why you need them.

## **How to support the project**

If you are interested in supporting the project start by reading the documentation in order to understand how both the Front-end and Back-end are structured, which languages and workflow do we work with and many other things.
