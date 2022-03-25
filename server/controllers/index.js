module.exports = {
   registerNewUser: require('./auth/register'),
   login: require('./auth/login'),
   createPost: require('./posts/createPost'),
   getPost: require('./posts/getPost'),
   getAllPosts: require('./posts/getAllPosts'),
   updatePost: require('./posts/updatePost'),
   deletePost: require('./posts/deletePost'),
   me: require('./auth/me')
}