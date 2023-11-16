import "../Moviepage/moviepage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Home/Loading";
import { useNavigate } from "react-router";


function Movie() {

    // Declearing variables 
    let nav = useNavigate();
    const [movies, setMovies] = useState();
    let [isgenre, setisgenre] = useState(false);
    let [islanguage, setislanguage] = useState(false);
    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");

    // Getting all the movies at starting 
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

    // chechking for the pagination button , if the button is required for page number or not 
    function isPage(page_number) {
        if (movies) {
            if (page_number <= movies.total_pages) {
                return true
            }
            else {
                return false
            }
        }

    }


    // pagination function 
    function click(event) {

        if (islanguage) {
            axios("http://127.0.0.1:8000/api/movies/language/?language=" + language + "&page=" + event.target.id)
                .then((response) => {
                    console.log(response.data)
                    setMovies(response.data)
                },
                    (error) => {
                        console.log(error);
                    }
                )
                .catch((error) => {
                    console.log(error)
                })



        }

        else if (isgenre) {
            axios("http://127.0.0.1:8000/api/movies/genre/?genre=" + genre + "&page=" + event.target.id)
                .then((response) => {
                    console.log(response.data)
                    setMovies(response.data)
                },
                    (error) => {
                        console.log(error);
                    }
                )
                .catch((error) => {
                    console.log(error)
                })


        }
        else {
            axios.get("http://127.0.0.1:8000/api/movies/?page=" + event.target.id)
                .then((response) => {

                    setMovies(response.data)

                },
                    (error) => {
                        console.log(error);
                    })
                .catch((error) => {
                    console.log(error)

                });


        }
    }


    let buttons = []
    if (movies) {
        for (let i = 1; i <= movies.total_pages + 2; i++) {
            buttons.push(<button className="btn btn-primary btn-lg page" disabled={!isPage(i)} id={i} onClick={click}>{i}</button>)
        }
    }


    // Search movie by genre
    function handleGenreChange(event) {
        if (event.target.value == "All") {
            setisgenre(false)
            setGenre(event.target.value);
        }
        else {
            setisgenre(true)
            setGenre(event.target.value);
        }

        axios("http://127.0.0.1:8000/api/movies/genre/?genre=" + event.target.value)
            .then((response) => {
                console.log(response.data)
                setMovies(response.data)
            },
                (error) => {
                    console.log(error);
                }
            )
            .catch((error) => {
                console.log(error)
            })

    }

    // Search movie by language
    function handleLanguageChange(event) {
        // console.log(event.target.value)
        if (event.target.value == "All") {
            setislanguage(false)
            setLanguage(event.target.value);

        }
        else {
            setislanguage(true)
            setLanguage(event.target.value);
        }

        // console.log(islanguage, language)


        axios("http://127.0.0.1:8000/api/movies/language/?language=" + event.target.value)
            .then((response) => {
                // console.log(response.data)
                setMovies(response.data)
            },
                (error) => {
                    console.log(error);
                }
            )
            .catch((error) => {
                console.log(error)
            })

    }

    // Navigate to the theater page
    function navigateTotheater(event) {

        let logged = localStorage.getItem("access_token");

        if (logged) {
            let id = event.target.id
            nav('/movie/' + id)
        }
        else{
            alert("Please Login First!")
            nav('/login/')
        }

    }

    function movieSearch(event) {
        event.preventDefault();
        let val = document.getElementById("search").value;
        axios.get("http://127.0.0.1:8000/api/movies/search/?search=" + val)
            .then((response) => {
                setMovies(response.data)
            },
                (error) => {
                    console.log(error)
                }

            )
            .catch((error) => {
                console.log(error)
            })
        // resetForm();
        document.getElementById("search").value = ""
    }



    return (
        <>
            <div className="filter-section">
                <span>
                    <label className="select-label">Genre: </label>
                    <select onChange={handleGenreChange} className="select-class">
                        <option value="All">All Genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>

                    </select>
                </span>
                <span>
                    <label className="select-label">Language: </label>
                    <select onChange={handleLanguageChange} className="select-class" >
                        <option value="All">All Language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telegu">Telegu</option>
                        <option value="Marathi">Marathi</option>
                    </select>
                </span>
                <span>
                    <form class="form-inline my-2 my-lg-0" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1em" }} onSubmit={movieSearch}>
                        <input class="form-control mr-sm-2 myinput" type="search" placeholder="Search" id="search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                    </form>

                </span>
            </div>
            {movies &&
                movies["movies"].map((i, p) => (
                    <div className="col-md-3">
                        <div className="card-main" id={i.movie_id}>
                            <img src={i.image} id={i.movie_id} className="card-img-top" alt="LoadImage"></img>
                            <h5 className="product-title" id={i.movie_id} >{i.title}</h5>
                            <p className="card-text" id={i.movie_id}>Director: {i.director}</p>
                            <p className="card-text" id={i.movie_id}>Language: {i.language}</p>
                            <p className="card-text genre" id={i.movie_id}>Genre: {i.genre}</p>
                            <p className="card-text genre" id={i.movie_id}>Duration: {i.duration} Mins</p>
                            <button type="button" className="btn btn-primary btn-lg" id={i.movie_id} onClick={navigateTotheater}>Book Now</button>
                        </div>
                    </div>)
                )
            }
            {!movies &&
                (<div className="loading"><Loading></Loading></div>)}

            {movies && movies["movies"].length <= 0 && (
                <div className="col-md-3">
                    <p>No Movies Found!!</p>
                </div>
            )}


            <div className="pagination">
                {buttons}
            </div>




        </>




    )
}



export default Movie;