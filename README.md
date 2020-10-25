## About this project

This is a React + Express.js + MySQL employee task management system.

## Features

1. User Management
   a. User Creation
   b. Edit User
   c. Delete User
   d. Task Report
2. Task Management
   a. Create Task
   b. Update Task
   c. Delete Task
   d. Assign Task
3. Drag and drop board system for task

## Prerequisites

Make sure the following dependencies are installed

1. Node.js
2. MySQL

## Setup

1. Clone this project to your development machine
2. Open a console in the cloned directory and run `npm install`
3. Do the same thing the server folder.
4. Now setup the database by running `node install.js` in the server directory.
5. Now start the react app using `npm start`
6. Start the express app by running `node index` in the server directory.
7. You can now open http://localhost:3000 to view your React app.

## Note:

The .env file in the server directory can be used to specify the options for MySQL database such as host, port, etc.

## How it works?

1. First of all, need to create tasks and then assigns to a particular user.
2. Task report will be represented on behalf of total task assigned, total task completed and total task going on.
