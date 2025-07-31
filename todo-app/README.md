#we created a todo app
it has a client and server made using react and express respectively 

##STEP ONE : 
##we tried dockerizing locally(not for production mode)

1. we created dockerfiles for both client and server
2. we created a .dockerignore files for both as well 
3. we created a docker-compose yml file , that simultanouesly builds both the images in one go ,
rather than us manually running docker build to build both the images and runs their container as well
4. docker-compose up --build : automates both the steps
  --build : builds the image for client and server
  up : runs the container for their images
5. docker-compose down : stops and removes the containers 

##STEP TWO:  (cleaned it a bit for production level):

1. we created two dockerfiles (one for prod and one for dev)
2. in prod dockerfile , we used mutli image staging 
3. we added healthcheckup which checks if the server is running healty every 5 seconds
4. added proxy for api calling in frontend 

## STEP THREE: (connecting mongodb docker service for our app locally)

1. modified docker-compose file to include mongo service 
2. made changes in codebase to save edit and delete todo from a database named todos in mongodb
3. no more localstorage setup - all data now persists in MongoDB 
4. screenshot of how to see the databse in terminal 
![MongoDB Architecture](.client/public/mongo.png)
5. or else open the mongo compass GUI

 






docker-compose up --build : rebuilds the same image and runs container
docker-compose : also rebuilds the same image after reading docker-compose.yml file 
docker-compose down : stops and deletes the container from running , doesnt delete the image but 
image name is based on the format :<project-name>/<service-name> (see in docker desktop)





