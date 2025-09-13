import mongoose from "mongoose";

const dataBaseConnection=()=>{
    try {
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("Database Connected Successfully!")
        }).catch((error)=>{
            console.log(`Database ConnectionFaild: ${error.message}`)
            process.exit(1)
        })
        
    } catch (error) {
        console.log("Database Connection Error",error.message)
        process.exit(1)
        
    }
}

export default dataBaseConnection;