# capstone
CS50 Submit Capstone

# Technologies
I used Django for the backend with API routes, and handle the front-end with React JavaScript Framework. This decoupling approach allows to an easier further mantenaice and grow.

# Initial Setup

## Django Setup
- Created folder '5/capstone'
- Created Virtual Environment 'venv'
- Installed Django on 'capstone' folder
- Started project 'capstone'
- Started app 'api' and added to INSTALLED_APPS
- Added 'api.urls' to urls.py
- Created "Students" model, and migrated
- Created 'students' view and url
- Tested Django on URL 127.0.0.1/api/students

## React Setup
- Installed React on '5/capstone' using npm create vite@latest
- Created React instalation in '5/capstone/frontend'
- Used npm install in '5/capstone/frontend' to install dependencies
- Tested App using npm run dev on http://localhost:5173/

## Integration
The folder structure at this point is:

```
5
|- capstone
-- |- capstone
-- |- |- api
-- |- |- capstone
-- |- |- manage.py
-- |- frontend
-- |- |- src
-- |- |- |- App.jsx
-- |- venv
-- |- README.md
-- |- .gitignore
```

- Installed django-cors-headers for allowing communication
- Added 'corsheaders' to INSTALLED_APPS = []
- Added 'corsheaders.middleware.CorsMiddleware' to MIDDLEWARE = []
- Added 'http://localhost:5173' to CORS_ALLOWED_ORIGINS = []

## Testing
- Created a simple list of students in App.jsx that consumes 127.0.0.1:8000/api/students

# To set-up this base:
- Install requirements.txt
- Install react dependencies
- Check the CORS_ALLOWED_ORIGINS for React server port
