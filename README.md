# imagecapture

## 1.Backend server
### install dependencies
git clone https://github.com/san-dd/imagecapture.git
cd imagecapture
npm install

### mongodb and Secret JWT_SECRET setup:
  config/appConfig.js make changes \n
  PORT:8080,\n
  MONGO_URI:'mongodb://127.0.0.1:27017',\n
  MONGO_DB_NAME:'mernloginauth',\n
  JWT_SECRET: "sl_myJwtSecret"\n
  
 ### Run backend server
  cmd:node app.js
  
 ### API route 
 1)localhost:8080/login=>
 2)localhost:8080/register
 3)localhost:8080/user
 4)localhost:8080/upload
