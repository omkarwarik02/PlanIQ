require('dotenv').config();

const app = require('./App');
const connectDB = require("./Database/DB");

const PORT = process.env.PORT || 3000;


(async () =>{
    try{
        await connectDB();
        console.log("✅ MongoDB Ready");
        console.log(process.env.BETTER_AUTH_URL);

        app.listen(PORT,()=>{
            console.log(`Server running on port${PORT}`)
        });
    } catch(err){
        console.error("Startup Error:", err.message);
        process.exit(1)
    }
})();