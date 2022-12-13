import jwt from 'jsonwebtoken';
import config from 'config';



export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
){
    const signingKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
    console.log("before jwt.sign");

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",  // means we are using public and private keys
    });

}

export function verifyJwt<T>( token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"): T|null{
    console.log("test2");
    const publicKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii");
    try {
        const decoded = jwt.verify(token,publicKey) as T;
        return decoded;
    }catch(error){
        return null;
    }
}

