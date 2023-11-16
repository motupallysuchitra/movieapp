import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

import axios from "axios";

import Movie from "../Moviepage/moviepage";
import Loading from "./Loading";
import "../Moviepage/moviepage.css"
import Footer from "../Navbar/Footer";
import { Banner } from "../Banner/Banner";




function Home() {
    const [movies, setMovies] = useState()

    useEffect(() => {
        async function getMovies() {
            await axios.get("http://127.0.0.1:8000/api/movies/?page=1")
                .then((response) => {

                    setMovies(response.data)

                },
                    (error) => {
                        console.log(error);
                    })
                .catch((error) => {
                    console.log(error)
                })
        }

        getMovies();
    }, [])





    return (
        <>
            <Navbar />
            <Banner/>
         
            <div className="row">
                
                    <Movie ></Movie>
            

            </div>
            <hr style={{color:"white"}} />
            <Footer></Footer>
        </>

    )


}



export default Home;