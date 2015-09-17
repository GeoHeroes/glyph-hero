# Glyph Engine

Glyph Engine is a deployable service for tying data to locations. It can be used to create, store, and query for "glyphs" which are point locations associated with pieces of data. Glyph Engine is meanted to be used as an API ontop of which other applications can be layered.

## Installation

1. Clone this repository
2. Run NPM install
3. Fill in db/postGIS/configGIS.fixme with the correct information for your postgres server (with the postGIS extension installed) and rename it to configGIS.js
4. Replace the server address in db/documentStore/db.js with the address for your mongoDB server
5. Specify a port for the server to listen on in the config.js file in the root folder.
6. Run `node server.js`

Your server should be up and running! Refer to [INSERT API DOCUMENTATION HERE] for guidance on how to use the API

## Managing AWS Scripts

All the following commands should be run from the root directory as the bash scripts include relative paths. In addition, many of the SSH connections will require the AWS private key. You will need to obtain the private key and store it in the aws folder for the commands to work.

**Note:** If you get any permissions errors when trying to execute a bash script, execute `chmod +x path/to/script.sh` to give the script execution permissions.

### Connecting to the web server and redeploying

1. Execute `aws/connect-server.sh` to create a secure connection to the main web server.
2. `cd` into the glyph-hero folder
3. type `nvm use 4.0.0` to switch to the latest version of node
4. execute `git pull origin master` to merge new commits into the folder.
5. Run `forever restart server.js` to restart the server using the new changes, or `forever start server.js` to start running the server if its not already. The forever package makes it so that node runs in the background as a daemon process. This allows the server to keep running even after we terminate the SSH connection.
6. When you're done, terminate the connection by executing `exit`

### Connecting to the postGIS RDS server

1. Execute `aws/create-gis-tunnel.sh` to create an SSH tunnel on port 6000 through the webserver to the postGIS RDS server.
2. Execute `aws/connect-gis-server.sh` to establish a connection to the postGIS server (using the psql utility) through the SSH tunnel


### Connecting to the MongoDB server

The MongoDB server is actually just a normal EC2 instance (like the web server), but with nothing running on it but a MongoDB daemon.

1. Execute `aws/connect-mongo-server.sh` to create a secure connection to the MongoDB server
2. Execute `sudo mongod` or `sudo mongod service start` to start the MongoDB daemon if its not already running.
3. When you're done, terminate the connection by executing git.

## Temp Route Documentation

As of now, application is deployed at: ec2-52-11-76-55.us-west-2.compute.amazonaws.com

### Create Glyph

'/api/createglyph' - POST

{
  "latitude": 25,
  "longitude": 25,
  "data": {
    //any valid json
  }
}

Returns JSON with two properties: success and glyphID

### Find Glyphs in Radius

'/api/findglyphsradius' - POST

{
  "latitude": 25,
  "longitude": 25,
  "radius": 1
}

Returns JSON with two properties: success and glyphs (array of glyphs with their data and an _id property)
