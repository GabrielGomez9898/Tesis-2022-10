# Visión Civil web app

A web app where the functionaries can visualize all the data about the crime reports made by the citizens from the mobile app.

This section of the repository contains all the source code of the web app that is meant to be used by the functionaries of the government. The Front-end of the web app is build with **React v17.0.2**. All the styles are written in **SASS v1.49.7**. The web app works with a serverless model, where Google Firebase functions are used as the Back-end of the web app. The used version of Firebase functions is **Django v4.0.2**.

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
* Back-end framework: **`express@4.17.3`**
* Cross-origin resource sharing: **`cors@2.8.5`**
* Managing Firebase authenticated users: **`firebase-admin@10.0.2`**
* DB integration: **`google-cloud/firestore@5.0.2`**

> You can check the full list of dependencies for the Back-end on [the package.json from the Back-end section](Cloud/package.json)

## **Run the project for testing purposes**
> In order to access the web app from a production point of view open your favorite browser and go to ***www.visioncivil.com***

### **Setting Up Firebase on your local machine**

In order to run and test the Firebase functions you have to install all the node modules:

1. Go to `Tesis-2022-10/WebPage/Cloud/`
2. Type `npm install`
3. Install Firebase Tools in order to be able to use Firebase CLI by typing `npm install -g firebase-tools`

Ask the proprietary of the Firebase app if you can have proprietary privileges. If you already have privileges you have to login in order to test the functions you have written:

Type `firebase login` and follow the steps showed on the Firebase CLI. When the CLI sends you to the browser Firebase page login by using the account that have the privileges previously asked. 

### **Bringing up the server**

If you have already worked with the project and have all the Python modules that the project requires [skip the below section](#starting-the-development-server).

#### **Preparing your Python environment and installing modules**

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

#### **Preparing your Node environment and installing modules**

1. Install all the required modules by typing `npm install`

#### **Running the React application**

Run the React application by typing `npm start`. The application will run on port **3000**.

> If you want to test each endpoint (aka view in Django) individually, without having to run the client side application, write an email to ***dankramirez@outlook.com*** asking for each resource URI and the reason why you need them.

## **How to support the project**

If you are interested in supporting the project start by reading the documentation in order to understand how both the Front-end and Back-end are structured, which languages and workflow do we work with and many other things.
