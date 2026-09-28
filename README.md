# Riseon

**A personal growth app for planning your days, journaling, and tracking resolutions, all in one place.**

![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

**🔗 Live demo: [riseon.vercel.app](https://riseon.vercel.app)**

## Overview

Riseon is a full-stack web app for self-improvement. It puts three everyday tools behind one login: a calendar for plans, a daily journal, and a resolution tracker that scores how well you kept each goal every day. The backend is a Spring Boot REST API that stores data in MySQL. It authenticates users with JWTs kept in HttpOnly cookies. The frontend is a React + TypeScript single-page app built with Vite and Tailwind CSS.

## Features

- **Authentication**: sign up and log in with email and password. Passwords are hashed with BCrypt, and the session is a stateless JWT stored in an HttpOnly cookie.
- **Plans calendar**: add, edit and delete plans on a month calendar. Each plan is either all-day or has a deadline time. The calendar also has a mini calendar, a "today's events" list and a view of the selected date's events.
- **Daily journal**: write one diary entry per day, then read, edit or delete it by picking a date on the calendar.
- **Resolutions**: create resolutions with a description, and mark each one public or private and active or inactive.
- **Daily resolution logs**: rate how well you followed a resolution each day on a 1-10 scale, with optional notes.
- **Yearly heatmap**: see each resolution's daily scores for a year as a heatmap, along with summary stats.
- **Protected routes**: pages you must log in to see, plus a dashboard that links to every tool.

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, React Router 7, Axios, lucide-react, react-hot-toast |
| Backend  | Java 21, Spring Boot 3.5 (Web, Data JPA, Security), JJWT 0.11.5, Lombok, Gradle 8.14 |
| Database | MySQL (via `mysql-connector-j` 8.1.0) |
| Tooling  | ESLint 9, Docker (backend image on `eclipse-temurin:21`) |

## Project Structure

```
Riseon/
├── backend/    # Spring Boot REST API (controllers, services, JPA entities, JWT security, Dockerfile)
└── frontend/   # React + TypeScript SPA (Vite, Tailwind, feature-based folders under src/features)
```

## Getting Started

### Prerequisites

- Java 21 (JDK)
- Node.js 18+ and npm
- A running MySQL server with an empty database created for the app

### 1. Clone

```bash
git clone https://github.com/kodercrish/Riseon.git
cd Riseon
```

### 2. Backend

The backend reads its settings from `backend/src/main/resources/application.properties`. Git ignores this file, so create it from the example:

```bash
cd backend
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Fill in the values:

| Property | Description | Example |
|----------|-------------|---------|
| `spring.application.name` | Application name | `riseon` |
| `spring.datasource.url` | JDBC URL of your MySQL database | `jdbc:mysql://localhost:3306/riseon` |
| `spring.datasource.username` | Database user | `your_db_user` |
| `spring.datasource.password` | Database password | `your_db_password` |
| `spring.datasource.driver-class-name` | JDBC driver | `com.mysql.cj.jdbc.Driver` |
| `spring.jpa.hibernate.ddl-auto` | Schema strategy (`update` creates the tables automatically) | `update` |
| `app.cors.allowed-origin` | Frontend origin that may send requests with credentials | `http://localhost:5173` |
| `server.port` | Port the API listens on (the example file lists `port`, which Spring ignores) | `8080` |
| `app.secret.key` | JWT signing secret (HS256, **at least 32 characters**) | `change-me-to-a-long-random-secret-string` |

Run the API:

```bash
./gradlew bootRun        # starts on http://localhost:8080
```

Other useful commands:

```bash
./gradlew build          # compile, run the tests, and build the jar in build/libs/
./gradlew test           # run the tests (needs a reachable database)
```

To run it with Docker instead (the multi-stage Dockerfile builds the jar for you):

```bash
docker build -t riseon-backend .
docker run -p 8080:8080 riseon-backend
```

The build copies `application.properties` into the image, so create that file first.

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend base URL, **including `/api`** | `http://localhost:8080/api` |

Scripts:

```bash
npm run dev       # start the dev server on http://localhost:5173
npm run build     # type-check and build for production into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

Open http://localhost:5173, create an account, and you are in.

## API Overview

Every route is under `/api`. Only the `/api/auth/**` routes work without logging in. The rest need the `jwt` cookie that login and signup set.

| Resource | Endpoints |
|----------|-----------|
| Auth | `POST /auth/signup`, `POST /auth/login`, `GET /auth/fetch`, `POST /auth/logout` |
| User | `GET /user/getuser?username=`, `PUT /user/updateuser` |
| Plans | `POST /plan/add`, `GET /plan/get`, `PUT /plan/update`, `DELETE /plan/delete?date=&title=` |
| Diary | `POST /diaryentry/add`, `GET /diaryentry/get?diaryDate=`, `PUT /diaryentry/update`, `DELETE /diaryentry/delete?diaryDate=` |
| Resolutions | `POST /resolution/add`, `GET /resolution/getall`, `GET /resolution/getpublic?username=`, `PUT /resolution/update`, `DELETE /resolution/delete?title=` |
| Resolution logs | `POST /resolutionlog/add`, `GET /resolutionlog/get?username=&title=`, `PUT /resolutionlog/update`, `DELETE /resolutionlog/delete?title=&logDate=` |

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request. For larger changes, please open an issue first so we can discuss them.

## License

No license has been specified for this project yet.
