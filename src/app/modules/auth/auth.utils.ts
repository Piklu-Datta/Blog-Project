import jwt from 'jsonwebtoken';

const Create = (
  jwtPayload: { userEmail: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn });
};

export default Create;
