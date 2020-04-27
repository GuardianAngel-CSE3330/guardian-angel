# Guardian Angel
## What is Guardian Angel?
Guardian Angel is a ghost sighting tracker application. It allows users to view, search for, and add ghost sightings and new ghosts. With Guardian Angel, you never have to worry about  unexpected ghost encounters ever again!
## Core Features
Guardian Angel **maintains an extensive list of all known ghosts**
* Search for ghosts by name
* View a list of all ghosts
* View and edit the most up-to-date ghost biographies available
* Log in and report a previously unknown ghost to be added to our database

Guardian Angel **tracks ghost sightings reported across the country**
* See detailed information about each sighting:
	* reporting user
	* sighting location
	* sighting date
	* spookiness level
* View a list of all sightings
* Search for sightings by:
	* keyword
	* location
	* ghost sighted
* Log in and report sightings
	* edit sightings you have reported
	* delete sightings you have reported

## Security 
Here at Guardian Angel, we believe that security must be a _core design requirement_, never an afterthought or additional feature. We have implemented numerous industry-standard security controls to protect the data and privacy of our users
* User information is securely stored in the cloud for security and scalability
* User passwords are never stored: passwords are securely hashed and salted with bcrypt for maximum security
* Authentication and authorization are performed using the JWT (JSON Web Token) framework to prevent unauthorized access to application functions or API endpoints
* API endpoints implement the principle of least privilege: endpoints are private and can only be accessed by authenticated users unless they are _required_ to be public (such as user login and user creation)

## Running our project
Interested in testing our the Guardian Angel Application? Simply follow the steps below:
1. Clone our repository:
`git clone https://github.com/GuardianAngel-CSE3330/guardian-angel.git`
2. Enter the project directory: `cd guardian-angel`
3. Spin up the docker containers with docker-compose: `docker-compose up`
4. Navigate to the application in your browser: `http://localhost:3000`
5. Manually test out the API with Postman at `http://localhost:8080/api`

