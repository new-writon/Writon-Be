import { redisClient } from "../config/redis.js";



const setRedis = async (
    key : string,
    value : string
):Promise<void>  => {
    return redisClient.v4.set(key, value);
}

const deleteRedis = async (
    key : string,
):Promise<void>  => {
    return redisClient.v4.del(String(key));
}


const getRedis = async (
    key : string,
):Promise<string> => {
     return await redisClient.v4.get(key);
}

const setTimeoutRedis = async(
    key : string,
    value : string,
    timeout : string,
    time : number
) => {

    return redisClient.v4.set(key, value, timeout, time);


}




export default {
    setRedis,
    deleteRedis,
    getRedis,
    setTimeoutRedis
    }