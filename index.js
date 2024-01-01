import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(express.static("public"));

app.get("/", (req,res) => {
   res.render("index.ejs", {question: "Click here to get best anime recommendation!"});
});

app.post("/random", async (req,res) => {
    try {
        const response = await axios.get(API_URL + "random/anime");
        const result = response.data.data;
        // console.log(result);
        res.render("index.ejs", { 

            image : result.images.jpg.large_image_url,
            title: result.title,
            title_eng: result.title_japanese,
            question: "Not satisfy?"
        
        });
    } catch (error) {
        res.status(500);
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});