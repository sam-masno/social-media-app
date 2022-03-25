module.exports = (err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500).json({success: false, message: err.message || 'Server Error'});
}