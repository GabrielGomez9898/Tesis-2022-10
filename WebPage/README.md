# VisiónCivil Web

A web app where the government functionaries can visualize all the data about the crime reports made by the citizens from the mobile app.

This section of the repository contains all the source code of the web app that is meant to be used by the functionaries of the government. The Front-end of the web app is build with **React v17.0.2**. All the styles are written in **SASS v1.49.7**. The Back-end of the app is build with **Django v4.0.2**.

## **Run the project for testing purposes**
> In order to access the web app from a production point of view open your favorite browser and go to ***www.visioncivil.com***

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