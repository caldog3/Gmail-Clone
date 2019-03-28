# gmail-client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

#create api key
click CreateCredentials - create API key

Activate the API key

#register for google client credentials
go to https://console.developers.google.com and create a new project with any name you want

#set up client ID
click CreateCredentials - create an OAuth client ID 

Select Web application and give it a name

In the Authorized JavaScript origins enter http://localhost:8081

In the redirect URIs also enter http://localhost:8081   

#configure dev.env.config.js 
change file name to dev.env.js

#insert data into dev.env.js
insert data into dev.env.js

#check for missing dependencies
try npm run dev and install all missing dependencies

# serve with hot reload at localhost:8081
npm run dev

(if there are errors trying to sign in, it can be due to the API still being activated on the Google end)

# 


```
