import { useParams } from "react-router";
// import { useHistory } from 'react-router-dom';
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../Api/interceptor";
import Loading from "../Home/Loading";




function Bookingpage() {


    const params = useParams();
    const movie_id = params.movie_id;
    const theater_id = params.theater_id;
    const [userbooking, setUserBooking] = useState();

    useEffect(() => {
        async function fetchBooking() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/user/booking/?movie=" + movie_id + "&theater=" + theater_id);
                if (response.ok) {
                    const result = await response.json();
                    setUserBooking(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooking();
    }, []);

    let seatbooks;
    let user;
    if (userbooking && userbooking.length > 0) {
        let finalbooking = userbooking.slice(-1);
        seatbooks = finalbooking[0]['seat_numbers'];
        user = finalbooking[0]['user']
    }

    const [movie, setMovie] = useState()
    const [theater, setTheater] = useState()


    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/booking/movie/?movie=" + movie_id);
                if (response.ok) {
                    const result = await response.json();
                    setMovie(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovie();
    }, []);


    useEffect(() => {
        async function fetchTheater() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/theater/?theater=" + theater_id);
                if (response.ok) {
                    const result = await response.json();
                    setTheater(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTheater();
    }, []);
    let m;
    if (movie) {
        m = movie["movies"]

    }
    let t;
    if (theater) {
        t = theater["theaters"]

    }

    let seatsbookedbyuser = []
    if (seatbooks) {
        for (let i = 0; i < seatbooks.length; i++) {
            seatsbookedbyuser.push(<div className="seat">{seatbooks[i]}</div>)
        }
    }




    return (<>
        <Navbar></Navbar>


        <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="col-md-12" style={{ alignItems: "center", justifyContent: "center", width: "auto" }}>

                {movie && theater && t[0] && (
                    <div className="col-md-12" style={{ alignItems: "center", justifyContent: "center", width: "auto" }}>
                        <h2 style={{ color: "white", textShadow: "2px 2px 5px black" }}>Movie: {m[0]["title"]}</h2>
                        <h2 style={{ color: "white", textShadow: "2px 2px 5px black" }}>Theater: {t[0]["name"]}</h2>
                        <h2 style={{ color: "white", textShadow: "2px 2px 5px black" }}>Address: {t[0]["address"]}</h2>
                        <h2 style={{ color: "white", textShadow: "2px 2px 5px black" }}>Showtime: {t[0]["timing"]}</h2>
                    </div>
                )}
                {!movie &&
                    (<div className="loading"><Loading></Loading></div>)
                }
                <h3 style={{ color: "white", textShadow: "2px 2px 5px black" }}>Booked Seats</h3>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
                    {seatsbookedbyuser.length > 0 ? (
                        seatsbookedbyuser.map((seat, index) => (

                            <div key={index} className="seat" style={{ marginRight: "20px", marginBottom: "10px" }}>
                                {seat.props["children"]}
                            </div>
                        ))
                    ) : (
                        (<div className="loading"><Loading></Loading></div>)
                    )}
                </div>
                <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                    Total Price: {userbooking && userbooking.length > 0 ? userbooking[0].total_cost : 0}
                </p>


                <a href={"/user/bookings/"} className="btn btn-primary">Confirm Book</a>




            </div>


        </div>
        <Footer></Footer>
    </>)
}


export default Bookingpage;


