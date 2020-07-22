# imagecapture

## 1.Backend server
### install dependencies
#### git clone https://github.com/san-dd/imagecapture.git
#### cd imagecapture
#### npm install

### mongodb and Secret JWT_SECRET setup:
  #### config/appConfig.js make changes accordingly
  #### PORT:8080,
  #### MONGO_URI:'mongodb://127.0.0.1:27017',
  #### MONGO_DB_NAME:'mernloginauth',
  #### JWT_SECRET: "sl_myJwtSecret"
  
 ### Run backend server
  #### cmd:node app.js
  
 ### API route 
 #### 1)localhost:8080/login=>
 #### 2)localhost:8080/register
 #### 3)localhost:8080/user
 #### 4)localhost:8080/upload


## 2.client react app setup
### install dependencies
#### go to client folder 
#### cd client
#### npm install

  
 ### Run react app
  #### cmd:npm start
