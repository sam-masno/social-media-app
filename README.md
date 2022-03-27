## Description
This is a basic social media application back end that allows users to create an account with email, post images, and search images by image tags through a REST API. Image tags are automatically generated on upload using the Clarifai API.

It uses MongoDB, Expressjs, JSON web tokens, and the Clarifai API.

## Setup
You will need the following:

- MongoDB Atlas connection string
- Clarifai API key

1. In root directory, rename the file `example.env` to `.env`
2. In the new `.env` file, the environment variables.
3. From the root directory run `npm install`
4. Navigate to the directory `server`. Create a directory `public`
5. In the directory `server/public`, create directories `users` and `uploads`
6. Run the command `npm run dev-server`
7. By default the application will run on port 3001.

## API Endpoints

1. `/api/auth/register` - creates a new user and returns a JWT and user object
- Post
Accepts: `form-data`
Required arguments:
    - name: string
    - email: string
    - password: string
    - image: image file
    
2. `/api/auth/login` - verifies email password combination and returns JWT and user object
-Post
Accepts: form-data or JSON
Required arguments:
    -email: string
    -password: string
3. `/api/auth/me` - returns user object if user has logged in
-Get

For protected resources, request must have the header `Authorization: Bearer ` + JWT set.

4. `/api/posts` - handles creation of new post and feching of all posts
-Post 
Accepts: `form-data`
Required arguments:
    -description: string
    -title: string
    -image: image file
-Get 
Optional query params: `tag`

5. `/api/posts/:postId` - fetch, update, or delete a certain post
-Get
None
-Put
Accepts: `form-data`
May only be performed by author of post
Optional Arguments:
    -description: string
    -title: string
    -image: image file
-Delete
May only be performed by author of post


