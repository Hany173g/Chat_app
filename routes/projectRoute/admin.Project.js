module.exports = (req,res,next) =>
{
    
    if (req.session.adminId) next();
    else
    {
        console.log("You Not a Admin")
        res.redirect('/')
    }
}