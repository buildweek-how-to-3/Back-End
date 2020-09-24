# Back-End

Unit 4 Node

## Documentation

Base URL for deployed API: https://backend-how-to.herokuapp.com/

## **Endpoints**

| Method | URL                  | Description                             | Requires Token |
| ------ | -------------------- | --------------------------------------- | -------------- |
| POST   | /api/auth/register   | register a new user                     | -              |
| POST   | /api/auth/login      | login as existing user                  | -              |
| POST   | /api/posts/users/:id | create a new posts by by specific users | X              |
| GET    | /api/posts           | gets all posts                          | X              |
| GET    | /api/posts/:id       | gets a specific posts by id             | X              |
| GET    | /api/posts/users/:id | gets a specific posts by users          | X              |
| GET    | /api/users           | gets all users                          | X              |
| GET    | /api/users/:id       | gets specific user                      | X              |
| PUT    | /api/posts/:id       | edit a posts                            | X              |
| DELETE | /posts/:id           | delete a posts                          | X              |
| DELETE | /users/:id           | delete a user                           | X              |

## **Table Requirements**

## **User**

| Name     | Type    | Required | Unique | Notes                     |
| -------- | ------- | -------- | ------ | ------------------------- |
| id       | integer | yes      | yes    | auto generated by the API |
| username | string  | yes      | yes    | -                         |
| password | string  | yes      | no     | -                         |

# **Posts**

| Name        | Type    | Required | Unique | Notes                                              |
| ----------- | ------- | -------- | ------ | -------------------------------------------------- |
| id          | integer | yes      | yes    | auto generated by the API                          |
| name        | string  | yes      | no     | -                                                  |
| category    | string  | yes      | no     | -                                                  |
| description | string  | yes      | no     | -                                                  |
| user_id     | integer | yes      | no     | Must be a valid user's id, this will be the author |
