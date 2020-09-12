import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorize = async (req, res, next) => {
  const token = req.headers.authorization;
 
  try {
    // const token = req.session.user;
    console.log('AUTHENTIC TOK'+ token);
    console.log(req.query);
      if (token == null) return res.status(401).send({ status: 'error', message: 'please login to get access to this route' });
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', message: 'you are not Autorized' });
    }
  
};
export default authorize;
