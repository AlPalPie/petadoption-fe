# Hosted
TBD


# Pet Adoption Website Using the MERN Stack

This is the frontend for a mock pet adoption website. The accompanying backend web API code is here:
> https://github.com/AlPalPie/petadoption-be

Users can view profiles and pictures of animals added by other users.
Users must create an account and login in order to be able to add, update, or delete animals or images.
Users can create an account with one of 3 roles, in order of increasing privileges - Customer, Employee, Admin.
For demonstration purposes, all 3 roles are available to anyone.

This is a personal project whose purpose is to sharpen my skills in full-stack development.

My wife and I live in a community where several stray cats have made a home amid the landscaping, mooching off many of the residents for sustenance and all-around being semi-affectionate bundles of joy. 
We love to take daily walks to visit these cats and take care of them. One of them even brought us a tiny bird to our doorstep! (the bird managed to escape safely)

I built this app to showcase those lovely cats! But also to mimic a pet adoption website and showcase the following features:

- Full Stack app using the MERN stack
- Complete RESTful backend web API and database using ExpressJS, Mongoose, MongoDB
- Frontend API requests and data caching with RTK Query
- User authentication and authorization using JSON Web Tokens (JWT)
- Frontend global state management using Redux and React
- Support for uploading image files (JPEG/PNG) through multipart form data using the multer middleware package



# Usage


### To install package dependencies:
```
npm install
```

### The current code is setup for actual deployment, hosted at:
```
TBD
```

Build command:
```
npm run build
```

To run the app:
```
npm start
```


### To modify the code for development, search the code for "DEPLOY" and modify as follows:

#### 1. In src/app/store.js

  I turn off the redux store devTools flag (which allows Redux DevTools integration).
  This flag should be set to true or removed (since default is true) if you want Redux DevTools integration

```
  devTools: true
```

#### 2. In src/app/api/apiSlice.js

   The file contains the api domain name which you will need to update to wherever you host your backend.
   For development you can use your localhost as shown below:

```
  export const getBaseUrl = () => {
    // DEPLOY: modify this for dev or deployment
    return 'http://localhost:3500'
  }
```

#### 3. To run in development mode
```
npm start
```



# Credit

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).




