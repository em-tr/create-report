import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:44342/api/upload",
    headers: {
        "Content-Type": "application/json",
    }, 
    responseType: "json"
})