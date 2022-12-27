const jwt = require('jsonwebtoken');
const JWT_SECRET = "this@app$is%secured";

const fetchuser = (req, res, next) => {
    //get the token from the header
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error:"Authenticate with a valid Token"})
    }
    
    try {
        //verify the jwt and decode the user
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Authenticate with a valid Token"})
    }
}

module.exports = fetchuser;