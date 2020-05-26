# Serverless TODO App

> Antonette Caldwell, Udacity Cloud Developer Program

## Project Stack

* Serverless
* Typescript 3.9
  * Eslint
  * Prettier
  * Circle CI
* DynamoDB
* AWS API Gateway
* AWS Kinesis Stream, Kinesis Firehose
* Serverless Plugins
  * Serverless-Offline
  * Serverless-Dynamodb-Local
* jsonwebtoken
* Docker

## To run this project

* Update AUTH ID and AUTH DOMAIN on client/src/config.ts
* Build serverless

```bash
cd backend
npm install
sls deploy -v
```

* Build client

```bash
cd client
npm install
npm run start
```

## Project Information

I run Insomnia to test the backend.

To get items, please copy the url for the GetTodos function, and make sure that you are using your Bearer token that was displayed when you go the client site.

To create items, please input with POST

```json
  {
  "name": "Change beddings",
  "dueDate": "2020-05-26"
  }
```

To update items, please input the todo id number from the list of todos, then update the item with PATCH

```json
  {
  "name": "Change beddings",
  "dueDate": "2020-05-27",
  "done": true
  }
```

To delete items, please input the todo id number from the lsit of todos, then delete item with DELETE
