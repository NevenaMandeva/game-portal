# Game Portal

This is a GraphQL project that uses MongoDB and TypeScript. The idea behind is a simple platform where users, developer(company) and games can be registered.

> ``MONGODB_URL`` to be set before running the project

## Collections
- User
- Developer (company)
- Game

CRUD operations are supported for each of the 3 collections.

## Restrictions

The following functionalities can be invoked only when a user is logged in with the appropriate role for each action.

| Action | Allowed for User Roles |
| ------ | ------ |
| create game | ADMIN, DEVELOPER |
| update game | ADMIN, DEVELOPER |
| delete game | ADMIN, DEVELOPER |
| create developer | ADMIN |
| update developer | ADMIN, DEVELOPER |
| delete developer | ADMIN |
| delete user | ADMIN |