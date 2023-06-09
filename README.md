# to-do-with-layered-architecture


This project is a RESTful API developed with Node.js, Express, TypeScript, and JWT for to do application with user authentication. The project follows the Test-Driven Development (TDD) approach and a clean, layered architecture.

## Architecture

The application is structured into distinct layers:

1. **Presentation**: Responsible for handling HTTP requests and responses.
2. **Application**:  Contains use cases, which are executed by the controllers in the presentation layer.
3. **Domain**: Consists of the business objects or entities.
4. **Infrastructure**: Takes care of external concerns like database connectivity.

This layered architecture allows separation of concerns and makes the codebase more manageable, flexible, and testable.

## Test-Driven Development (TDD)

This project has been developed using the Test-Driven Development (TDD) methodology. With TDD, test cases are written before the actual code. This approach enhances the design, produces a robust codebase, and ensures that the code does what it's intended to do.


## Features

- User Registration
- User Login
- JWT Authentication
- CRUD operations for User Tasks

## Installation

Before you start, make sure you have Node.js and npm installed.

Clone the repository:

```bash
git clone https://github.com/AshishAvesta/to-do-with-layered-architecture.git

Navigate into the directory:

cd to-do-with-layered-architecture

Install the dependencies:

npm install

You can run the server using:

npm run start

Run tests using:

npm run test


Endpoints
    User Routes
        - POST /users: Register a new user

    Login Routes
        - POST /login: Log in a user

    Task Routes
        - POST /tasks: Create a new task
        - GET /tasks: Retrieve all tasks of a user


Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


