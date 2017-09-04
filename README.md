# api-auth-app
BASIC API Authentication on NodeJs Application

## Objective
Develop a simple User Authentication for an API in Node application.

## Requirements
The application should have 1 Public API that can be accessed anonymously, 1 Public API that can be accessed by any authenticated user and 1 Private API which can only be accessed with a certain permissions of a certain user. The API will consume JSON requests and respond with JSON output.

## API Design

There are 3 different APIs suggested

 ### #1
 - API: /products
 - Description : This API (public API) returns the list of products as JSON, Authorization header is    not required, hence this API can be  accessed by anyone anonymously.
 - HTTP Method: GET
 - Request Data: None
 - Response Data Example:
```sh
 [
  {
	productId: 1983921,
	name: 'Zantac 150 Maximum Strength Cool Mint Tablets',
	description: 'Look! Sugar-free heartburn relief. Ranitidine tablets 150 mg. Prevents & relieves heartburn associated with acid indigestion & sour stomach. Easy to swallow with water. '
	price: 24.99
   },
     {
	productId: 8273872,
	name: 'Prilosec OTC Frequent Heartburn Medicine and Acid Reducer Tablets, 28CT',
	description: 'Prilosec OTC provides heartburn treatment for frequent heartburn that occurs 2 or more days a week'
	price: 44.99
   },
    {
	productId: 277352,
	name: 'Magox Magnesium Oxide 400 mg Tablets',
	description: 'Dietary Supplement. Pharmaceutical grade. Most concentrated form of magnesium. Just one dose delivers over 120% of the daily value. Doctor recommended. Sugar and gluten-free.'
	price: 13.99
   },
     {
	productId: 1983921,
	name: 'Natural Vitality Natural Calm Anti Stress Original Unflavored Liquid Drink 350mg, 16 OZ',
	description: 'Magnesium and calcium are fundamental nutrients that need to be in balance with each other in order for you to fully experience good health. Their importance on a cellular level is critical. '
	price: 33.99
   }
 ]
```
### #2
 - API: /order
 - Description : This API is used submit the order request by authenticated user, Authorization header is required.
 - HTTP Headers -   Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
 - HTTP Method: POST
 - Content-Type: application/json
 - Request Data Example: 
 ```sh
 [
	{ itemId: 1983921, qty:1},
	{ itemId: 277352, qty:3},
	{ itemId: 8273872, qty:10},
 ]
```
 - Response Data Example:
 ```sh
{
	orderId : WEB9881928198,
	message : 'We have received your order, admin will review and approve the order for the shipment'
 }
```
 
 
 ### #3
 - API: /pending
 - Method: POST
 - Description : This API (Private API) is used by order admin to approve the order request, Authorization header is required.
 - HTTP Headers-  Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
 - Content-Type: application/json
 - Request Data Example:
 ```sh {
   orderId: 121983721
   status: 'approved'
 }
```

## Database Design
Postgresql database is recommended to use on this project. The database name is 'authdb', and we shall use public schema, however, we could use private schema too.
![alt text](https://github.com/sarancr/api-auth-app/blob/master/doc/db-design.JPG)
### Tables
### USER
The purpose of this table is to store application user credentials. This table has four fields, and each field name and it's purpose is provided below

    - ID - Type: SERIAL, It is auto increatment number field and primary key
    - LOGIN_ID - TYPE:CHAR(256). It is user name field, a unique column and no NULL value allowed
    - PASSWORD - TYPE: TEXT. It holds user password, it can have ecyrpted value, but for demo purpose, we shall simply store plan text, and no encryption needed.
    - LAST_UPDATE - TIMESTAMP DEFAULT NOW() It is a TIMESTAMP field to trace when was the last update done on any row

### PERMISSION

The purpose of this table is to store differnt permission types. The example permission could be, 'general', 'admin', etc. This table has four fields, and each field name and it's purpose is provided below

    - ID - Type: SERIAL, It is auto increatment number field and primary key
    - name - TYPE:CHAR(128). It is a permission name column, a unique column and no NULL value allowed. 
    - DESCRIPTION - TYPE: TEXT. It can have lengthy description about the purpose of this particular permission type.
    - LAST_UPDATE - TIMESTAMP DEFAULT NOW() It is a TIMESTAMP field to trace when was the last update done on any row

### USER_PERMISSION

The purpose of this table is to store mapping between user and given permission to the user. This table has three fields, and each field name and it's purpose is provided below.

    - USER_ID - Type: INTEGER, it references the ID field in USER table.
    - PERMISSION_ID - TYPE:INTEGER. Iit references the ID field in PERMISSION table.
    - LAST_UPDATE - TIMESTAMP DEFAULT NOW() It is a TIMESTAMP field to trace when was the last update done on any row
    
## Installation

This section describes the softwares required to set up and run this project on development environment.

- Install NodeJs v6 from https://nodejs.org/en/download/
- Either you can use npm which comes from nodeJs or you can yarn package manager
- Download and install yarn from here - https://yarnpkg.com/en/docs/install
- Clone this project from github
- Go to project directory on command line
- If you are using npm, then run the below command to fetch the project dependencies from npm
 ```sh
 npm install
```
- If you are using yarn, then run the below command to fetch the project dependencies from npm
```sh
yarn
```
 - ##### Database setup
    - Install Database, download and install postgresql from https://www.postgresql.org/download
    - Login into postgresql server
     - Database, tables, sample data can be created by running the init-db.sql script which can be found under config directory in the project.

## Configure Database in the project
- Inside project, open config/database.js file and provide the database server url, and credentials
as like below
```sh
module.exports = {
  database: "authdb", // name of the database
  user: "postgres", // name of the user account
  password: "demo1234", // password of the user account
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};
```

## Running the application
If you are using npm, then the application can be run by executing the below command
```sh
npm start:dev
```
If you are using yarn,  then the application can be run by executing the below command
```sh
yarn start:dev
```
By default, the port number 3000 is used, so load the URL http://localhost:3000/ on browser to make sure the application works!

### Project Structure

- bin/www.js : It contains HTTP Server creation code (Starting point of the application)
- app.js
    - Creates express app
    - Using middleware to process json
    - Use middleware security/guard.js to guard each request against user authentication
    - Defines routing and mapping
 - security/guard.js : 
    - Defines rules to authorize the request or not
    - Uses database tables to identify user roles and take appropriate action upon it
 - routes/
    We shall defines route.js for each each feature. For example, order.js, pending.js, products.js. We can combine all these routes into one file. But it is nice to have them in individual file because the will helps easily locate based on the application feature.
 - config/
  Contains application configuration files
  - database.js - Database URL, Pooling configuration, login credentials
  - db-init.sql - Database create script
  
 - data/
  Contains sample data for API request, and response
  
  - doc/
  Contains project documents
  
  - public/
  Contains view files to be server when the application URL is directly accessed on browser
    
    


