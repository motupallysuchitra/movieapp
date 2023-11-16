import { useParams } from "react-router";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Home/Loading";
import "./moviepage.css"
import Footer from "../Navbar/Footer";
import { fetchWithToken } from "../Api/interceptor";



function SingleMovie() {

    const [movies, setMovies] = useState()
    let params = useParams()
    let id = params.id

    useEffect(() => {

        async function fetchMovie() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/movies/single/?id=" + id);
                if (response.ok){
                    const result= await response.json()
                    setMovies(result)
                }
            }
            catch(error){
                console.log(error)
            }

        }
        fetchMovie()
    }, [])
    let movie
    if (movies) {
        movie = movies["movies"]
    }
    const [theaters, setTheaters] = useState()

    useEffect(() => {

        async function fetchTheater(){
            try{
                const response=await fetchWithToken("http://127.0.0.1:8000/api/movies/theaters/?movie=" + id + "&page=1");
                if (response.ok){
                    const result=await response.json()
                    setTheaters(result)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        fetchTheater()

        // axios.get("http://127.0.0.1:8000/api/movies/theaters/?movie=" + id + "&page=1")
        //     .then((response) => {
        //         setTheaters(response.data)
        //     })

    }, [])
    // console.log(theaters)



    return (
        <>
            <Navbar></Navbar>
            <div className="thtrdiv">
                <div className="col-md-3" style={{ margin: "1em", display: "flex" ,justifyContent:"center"}}>
                    {movie &&
                        movie.map((i, p) => (
                            <div class="card" style={{ "width": "18rem", "backgroundColor": "transparent" }}>
                                <img src={i.image} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 className="product-title" id={i.movie_id} >{i.title}</h5>
                                    
                                    <p className="card-text" id={i.movie_id}>Director: {i.director}<img src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="Icon" style={{ width: '30px', height: '30px' }} />
</p>
                                    <p className="card-text" id={i.movie_id}>Language: {i.language}</p>
                                    <p className="card-text genre" id={i.movie_id}>Genre: {i.genre}</p>
                                    <p className="card-text genre" id={i.movie_id}>Duration: {i.duration} Mins</p>
                                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>

                            </div>
                        ))

                    }
                </div>

                <div className="col-md-6" style={{ margin: "1em", display: "flex", flexDirection: "column" }}>
                    <h2 style={{ color: "white", textShadow: "2px 2px 3px black" }}>Theater List</h2>
                    
                    <hr style={{ color: "white" }} />
                    {theaters &&
                        theaters["theaters"].map((i, p) => (
                            <div class="card-body">
                                <h5 className="product-title" id={i.theater_id} >{i.name}</h5>
                                <p className="card-text" id={i.theater_id}>Address: {i.address}</p>
                                <p className="card-text" id={i.theater_id}>Pincode: {i.pincode}</p>
                                <p className="card-text genre" id={i.theater_id}>Timings: {i.timing}</p>

                                <a href={"/movie/"+id+"/theater/"+i.theater_id} class="btn btn-primary" id={i.theater_id}>Book Now</a><img src="https://cdn-icons-png.flaticon.com/128/8932/8932779.png" alt="Icon" style={{ height: '60px' }} />

                                <hr />
                            </div>


                        ))}
                    {!theaters &&

                        (<div className="loading"><Loading></Loading></div>)

                    }
                </div>
            </div>
            <hr style={{ color: "white" }} />
            <Footer></Footer>
        </>
    )

}


export default SingleMovie;