# School Management System (Capstone Project - CS50w)
A mobile-responsive web system that helps school management staff to keep track of students grades and passed exams.

## Technologies used
+ Django *(backend for API routes and database)*
+ React *(frontend)*
+ Bootstrap *(CSS styles)*

## Running the project
- The computer must have [Node.js](https://nodejs.org/es/download) installed.
- Clone this repository to your local machine.
- In the **main folder**, use ```pip install -r requirements.txt ``` to install Python dependencies.
- Navigate to **frontend** folder, use ```npm install``` to install **React dependencies**
- Navigate to **capstone** folder and run ```python manage.py runserver``` to start the backend server.
- Open other terminal, navigate to **frontend** folder and run ```npm run dev``` to start React frontend server.
- Visit ```http://localhost:5173/``` (where *:5173* is the port used by the fronend server [*default*]).

## Distinctiveness and Complexity
This project uses the technologies learned from CS50w Course to create a solution to teachers and school management staff, helping them keep track of students academic history.

It provides the user an integrated view of current students' academic history, and allows to add students, add exams, and set grades. It also let the user enter each student profile to have a glance at that particular student's history of examinations.

It uses a Python Django backend that serves an API, and a JavaScript React frontend that consumes such API. It has a relational database model that links students and exams to subjects and grades. The API delivers ready-to-use JSON responses to the frontend, and the requests it recives are validated in the backend before any modification to the database.

The application uses several designing patterns viewed in previous projects of this course ([Commerce](https://github.com/Polomeo/commerce), [Mail](https://github.com/Polomeo/mail), [Network](https://github.com/Polomeo/network)) as a basis to create a new solution for this school managment scenario.