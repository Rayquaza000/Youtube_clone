import jsonwebtoken from 'jsonwebtoken'
export async function authorizeUser(req,res,next){
    const authHeaders=req.headers['authorization'];
            const token=authHeaders && authHeaders.split(' ')[1];
            const stillLoggedin=jsonwebtoken.verify(token,"logintoyoutube");
            if(stillLoggedin)
            {
                next();
            }
            else{
                
                return res.status(403).json({"message":"invalid jwt token"});
            }
}