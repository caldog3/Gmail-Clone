Mockup 8
after the first screen, uncomment UtilityBar.vue line 213

to get the second screen (Mockup8b) clip on the private tab.

to get the thrid screen (Mockup8c) from second screen: uncomment out InboxList.vue lines 323 & 359 & 360 and comment out InboxList.vue lines 362 & 363 & 302, 

to get the fourth screen (Mockupd) from third screen: uncomment out InboxList.vue lines 362 & 363 & 302 and 280 and comment out lines 279 & 359 & 360.

# gmail-client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

#configure dev.env.config.js 
change file name to dev.env.js

#register for google client credentials
go to https://console.developers.google.com and create a new project with any name you want

#set up client ID
click CreateCredentials - create an OAuth client ID 

Select Web application and give it a name

In the Authorized JavaScript origins enter http://localhost:8081

In the redirect URIs also enter http://localhost:8081

#create api key
click CreateCredentials - create API key

#insert data into dev.env.js
insert data into dev.env.js

#check for missing dependencies
try npm run dev and install all missing dependencies

# serve with hot reload at localhost:8081
npm run dev


```
