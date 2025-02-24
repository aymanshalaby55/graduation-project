# Graduation Project

## Project Structure

### Backend

- **.dockerignore**: Specifies files and directories to be ignored by Docker.
- **.env**: Environment variables for the backend.
- **.eslintrc.json**: ESLint configuration file for linting JavaScript code.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.prettierrc**: Prettier configuration file for code formatting.
- **app.js**: Entry point for the backend application.
- **controllers/**: Contains controller files that handle incoming requests and responses.
- **databaseScripts.js**: Scripts for database initialization and management.
- **Dockerfile**: Docker configuration file for building the backend container.
- **ERD.drawio**: Entity-Relationship Diagram for the database schema.
- **middleware/**: Contains middleware functions for request processing.
- **models/**: Contains database models.
- **package.json**: Lists dependencies and scripts for the backend.
- **public/**: Static files served by the backend.
- **routers/**: Contains route definitions for the backend.
- **services/**: Contains service files for business logic.
- **tempCodeRunnerFile.js**: Temporary file created by the code runner.
- **test/**: Contains test files for the backend.
- **utils/**: Utility functions used across the backend.

### Frontend

- **.dockerignore**: Specifies files and directories to be ignored by Docker.
- **.eslintrc.json**: ESLint configuration file for linting JavaScript code.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.next/**: Next.js build output directory.
- **.vscode/**: Visual Studio Code workspace settings.
- **app/**: Contains the main application files for the frontend.
- **components/**: Reusable React components.
- **components.json**: Configuration file for components.
- **Dockerfile**: Docker configuration file for building the frontend container.
- **lib/**: Utility libraries for the frontend.
- **next-env.d.ts**: TypeScript environment settings for Next.js.
- **next.config.mjs**: Next.js configuration file.
- **package.json**: Lists dependencies and scripts for the frontend.
- **postcss.config.js**: PostCSS configuration file for CSS processing.
- **public/**: Static files served by the frontend.

### Models

- **models/**: Contains shared models used across the project.

### Root Files

- **docker-compose.yml**: Docker Compose configuration file for setting up multi-container applications.
- **package.json**: Lists dependencies and scripts for the entire project.
- **README.md**: Project documentation.

## Description

This project is a full-stack application for managing various aspects of a graduation project. It includes a backend built with Node.js and Express, and a frontend built with Next.js and React. The backend handles API requests, database interactions, and business logic, while the frontend provides a user interface for interacting with the application.