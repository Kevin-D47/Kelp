# Welcome to the Kelp!

Kelp is a clone of Yelp that is a crowd-sourced local business review and social networking site. Users can browse business to find what they are looking for along with reviewing those businesses they have visited. Users themselves if they have one also have the option of managing their own businesses on the site.

Link to test out website: https://kelp-app-aa.herokuapp.com/

<br>

## Tech Stack
  Frameworks, Libraries, and Platforms:

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database:

![SQL](https://img.shields.io/badge/SQL-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

Hosting:

![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

<br>

## How to run Kelp Locally

* Clone/download the repo https://github.com/Kevin-D47/Kelp

* cd into Kelp-main folder and ``` run pipenv install ```

* Open two terminal paths for both Kelp-main and react-app.
* Under Kelp-main run ```pipenv shell``` then ```flask run```, for react-app run ```npm install``` then ```npm start```
* Create a .env file under the root of the backend folder with the following contents:

  ``` REACT_APP_BASE_URL=http://localhost:5000 ```

<br>

## Getting started
Clone the repository then install dependencies

Using ```pipenv install -r requirements.txt ```
Create a .env file based on the example with proper settings for your development environment


Get into your pipenv run ```pipenv shell```, ```flask db migrate```, ```flask db upgrade```, ```flask seed all``` and ```flask run```

<br>

## Environment Info
* On root directory create a .env file and add
```
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here»
DATABASE_URL=sqlite:///dev.db
```

* Inside react-app create another .env and add
```
    REACT_APP_BASE_URL=http://localhost:5000
```

<br>

## Features

### 1. New account creation, login, log out, and guest/demo log in

* Users can sign up, log in, and log out.
* Users can use a demo login to try the site.
* Users can't use certain features without logging in (like creating a business and/or a review).
* Logged in users are directed to their home feed where posts made by other users are shown.
* Logged out users are directed to a splash page asking them to login again.

### 2. Businesses
* All users can get all Business from the splash page.
* Logged-in users can create Businesses.
* Show a single Business's details on a page.
* Logged-in users can edit their own Businesses.
* Logged-in users can delete their own Businesses.

### 3. Reviews
* All users can get all Reviews for a Business on its details page.
* Logged-in users can post Review.
* Logged-in users can edit their own Reviews.
* Logged-in users can delete their own Reviews.
* All users can see how many total Reviews/Ratings are on a Business.

### 4. Images (not yet implemented)
* All users can get all Images for a Business on its details page.
* Logged-in users can post a Image.
* Logged-in users can delete their own Images.
* All users can see how many total Images are on a Business.

### 5. Type (not yet implemented)
* Businesses will have types such as delivery, takeout, or dine-in
* All users will be able to filter or search by business type
* Logged-in users can specify what type of business they are upon creating a new business
* Logged-in users can edit the type of business they own
* Logged-in users can delete the type of business they own

### 6. Menu (not yet implemented)
* Business will have there own menu of food items
* All users will be able to see all menu items for a specific business
* Logged-in users can create menu items for their business
* Logged-in users can edit menu items for their business
* Logged-in users can delete menu items for their business

### 7. Search Bar (not yet implemented)
* All users can utilize the search bar to get/search by Business title, username, and type.
* every time the user inputs letters it will update the Businesses that they're searching for.

### 8. Follow (not yet implemented)
* Logged-in users will be able to follow their favorite businesses.
* Logged-in users can see what businesses they follow on their profile page.

### 9. Maps (not yet implemented)
* Businesses will be able to show their location on Google Maps

<br>

## Preview Images

### HomePage/Splash Page
![kelp-homepage](https://user-images.githubusercontent.com/100639799/199847793-4c170bb8-7b45-41a7-984e-15feeb7ee834.png)

* A welcome page showcasing a carousel of existing business images, along with buttons to redirect you to login or signup pages.

### Login Page
![kelp-login](https://user-images.githubusercontent.com/100639799/199847814-f043b435-4fe1-4b3f-ba16-7367cef26bbc.png)

* Login page were existing users can sign up.

### Sign-Up Page
![kelp-signup](https://user-images.githubusercontent.com/100639799/199847824-ba2dfcf1-db31-407b-8123-a6aa562cf614.png)

* Sign up page were users can make a account.

### Restaurants Page
![kelp-RestaurantPage](https://user-images.githubusercontent.com/100639799/199847927-93aaa50e-f461-4f25-ae1c-4affb567b850.png)

* This page showcases all existing businesses along with all their information. The overall rating and number of reviews will update as new reviews are made for the business.

### Business Details Page
![kelp-BusinessDetailsPage](https://user-images.githubusercontent.com/100639799/199847969-6cafdb61-c986-4b6b-9cbd-aa93705fa192.png)

* This page showcases the specific selected business along with all their additional information. This page has options for a user to post a review and owner of that business to edit and delete their business.

### Reviews (on Business Details Page)
![kelp-AllReviews](https://user-images.githubusercontent.com/100639799/199847980-824b5b72-128c-4f29-bdf0-5ec97f353502.png)

* This is located on the Business Details page showcasing all the reviews for that business. If the user is the owner of a review there are options for them to edit and delete that review.

### Create Business Page
![kelp-CreateBusiness](https://user-images.githubusercontent.com/100639799/199847989-2e5779ac-f799-440b-8a96-be36c1afd860.png)

* This page displays a form for user to input information for them to create a new business.

### Create Review Page
![kelp-CreateReview](https://user-images.githubusercontent.com/100639799/199847999-2fe5b8fe-e0b5-4782-b4d1-fe5642e51f96.png)

* This page displays a form for user to input information for them to create a new review.
