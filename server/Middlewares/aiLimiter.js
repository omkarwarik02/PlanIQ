const User = require("../Models/User");
const mongoose = require('mongoose');


const DAILY_LIMIT = 2;

const getUsageCollection = () => mongoose.connection.collection('aiUsage');

const aiLimiter = async(req,res,next) => {
try{
 console.log('req.user:', req.user)
    const userId = req.user.id;
    const now = new Date();
    const usageCol = getUsageCollection();

    let usage = await usageCol.findOne({userId});

    if(!usage){
        await usageCol.insertOne({userId, count:1,lastReset:now});
        return next();
    }
    const hoursSinceReset = (now - new Date(usage.lastReset)) / (1000 *60 * 60);

    if(hoursSinceReset >= 24){
        await usageCol.updateOne({userId}, {$set:{count:1,lastReset:now}});
        return next();
    }

    if(usage.count >= DAILY_LIMIT){
        return res.status(429).json({
            error:'Daily AI limit reached.Try again tomorrrow.',
            remaining:0
        });
    }
    await usageCol.updateOne({userId},{$inc:{count:1}});
    next();

}catch(err){
    res.status(500).json({error:'Usage check failed'});
}
};

module.exports = aiLimiter;