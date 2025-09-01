





exports.getHome = async(req,res,next) => {
    res.render('index', {
        isUser:req.session.userId,
        friendRequests: req.friendsRequest
    })
}