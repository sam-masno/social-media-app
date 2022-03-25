module.exports = {
   registerNewUser: require('./auth/register'),
   login: require('./auth/login'),
   createPost: require('./posts/createPost'),
   getPost: require('./posts/getPost')
}