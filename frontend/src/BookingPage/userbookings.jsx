import { useParams } from "react-router";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../Api/interceptor";
import Loading from "../Home/Loading";





function UserBookings() {





    const [userBookings, setUserBookings] = useState([]);
    const [movies, setMovies] = useState([])
    const [theaters, setTheaters] = useState([])

    useEffect(() => {

        let access_token = localStorage.getItem('access_token')
        async function fetchUserBookings() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/user/bookings/",
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    }

                );
                if (response.ok) {
                    const data = await response.json();
                    setUserBookings(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchAllMovies() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/movies/");
                if (response.ok) {
                    const data = await response.json();
                    // console.log("Fetched movies data:", data);
                    setMovies(data.movies);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchAllTheaters() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/theaters/");
                if (response.ok) {
                    const data = await response.json();
                    setTheaters(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserBookings();
        fetchAllMovies();
        fetchAllTheaters();
    }, []);




    const getMovieName = (movieId) => {
        const foundMovie = movies.find((movie) => movie.movie_id === movieId);
        return foundMovie ? foundMovie.title : "Unknown Movie";
    };
    const getTheaterName = (theaterId) => {
        const foundTheater = theaters.find((theater) => theater.theater_id === theaterId);
        return foundTheater ? foundTheater.name : "Unknown Theater";
    };

    const getTheaterTiming = (theaterId) => {
        const foundTheater = theaters.find((theater) => theater.theater_id === theaterId);
        return foundTheater ? foundTheater.timing : "Unknown Theater";
    };




    return (
        <>
            <Navbar></Navbar>
            <div className="container" style={{ justifyContent: "center", alignItems: "center", color: "white", textShadow: "2px 2px 3px black", gap: "20px" }}>

                <h2>My Bookings</h2>
                <hr />
                {userBookings.length == 0 ?
                    (<div className="loading"><Loading></Loading></div>)
                    :
                    (userBookings && userBookings.map((booking) => {
                        const movieName = getMovieName(booking.movie);
                        const theaterName = getTheaterName(booking.theater);

                        if (movieName !== "Unknown Movie" && theaterName !== "Unknown Theater") {
                            return (
                                <div style={{ display: "flex", boxShadow: "2px 2px 5px black", width: "auto", height: "auto", alignItems: "center", justifyContent: "center", padding: "2em" }} key={booking.booking_id}>
                                    <h2>
                                        Movie: {movieName} <br />
                                        Theater: {theaterName} <br />
                                        Timing: {getTheaterTiming(booking.theater)} <br />
                                        Seats: {booking.seat_numbers.join(",")}
                                    </h2>
                                </div>
                            );
                        }
                        return (<div className="loading"><Loading></Loading></div>)
                    }))
                }




            </div>
            <Footer></Footer>
        </>
    )
}


export default UserBookings;