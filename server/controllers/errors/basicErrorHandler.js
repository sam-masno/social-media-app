module.exports = (err, req, res, next) => {
    console.log('error handler hit')
    res.status(err.status || 500).json({success: false, message: err.message || 'Server Error'});
}