elcome to the Kelp wiki!

Kelp is a clone of Yelp that is a crowd-sourced local business review and social networking site. Users can browse business to find what they are looking for along with reviewing those businesses they have visited. Users themselves if they have one also have option of manage their own businesses on the site.

Link to test out website: N/A

## Tech Stack
  Frameworks, Libraries, and Platforms:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database:

![SQL](https://img.shields.io/badge/SQL-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

Hosting:

![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)


## How to run Kelp Locally

* Clone/download the repo https://github.com/Kevin-D47/Kelp

* cd into Klickr-main folder and ``` run pipenv install ```

* Open two terminal paths for both Klickr-main and react-app.
* Under Klickr ``` run pipenv shell  then flask run, for react-app run npm install```
* Create a .env file under the root of the backend folder with the following contents:

  ``` REACT_APP_BASE_URL=http://localhost:5000 ```

## Getting started
Clone the repository then install dependencies

using ```pipenv install -r requirements.txt ```
Create a .env file based on the example with proper settings for your development environment


 ``` Get into your pipenv run pipenv shell,flask db upgrade, flask seed all, flask run```

## Environment Info
```
DATABASE_URL=sqlite:///dev.db
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here»
```

```
Inside react-app create another .env and add     REACT_APP_BASE_URL=http://localhost:5000

```


## Features To Add


## Challenges
