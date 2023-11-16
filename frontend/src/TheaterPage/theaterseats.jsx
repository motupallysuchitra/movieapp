import { useNavigate, useParams } from "react-router";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchWithToken } from "../Api/interceptor";
import "../TheaterPage/theaterseat.css"



function TheaterSeats() {
    let nav = useNavigate()
    const params = useParams()
    const [movies, setMovies] = useState([])
    const [theaters, setTheater] = useState([])

    const [seats, setSeats] = useState([]);
    const [selectedseat, setSelectedSeat] = useState([]);
    const [amount, setAmount] = useState([])
    let movie_id = params.movie_id;
    let theater_id = params.theater_id;
    useEffect(() => {
        async function fetchSeats() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/movies/theaters/seats/?movie=" + movie_id + "&theater=" + theater_id);
                if (response.ok) {
                    const result = await response.json()
                    setSeats(result)
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchSeats()
    }, [])




    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/movies/single/?id=" + movie_id);
                if (response.ok) {
                    const result = await response.json()
                    setMovies(result)
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchMovie()
    }, [])
    useEffect(() => {
        async function fetchTheater() {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/theater/?theater=" + theater_id);
                if (response.ok) {
                    const result = await response.json()
                    setTheater(result)
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchTheater()
    }, [])


    let theater;
    if (theaters) {
        theater = theaters["theaters"];
    }

    let movie;
    if (movies) {
        movie = movies["movies"];
    }


    function checkAvailability(seatno) {

        let isavailable = false;
        if (seats) {
            for (let i = 0; i < seats.length; i++) {


                if (seatno == seats[i].number) {
                    isavailable = true
                    break;
                }


            }

        }
        return isavailable

    }
    function seatSelect(number, value) {

        const seatExists = seats && seats.some(seat => seat.number === number); // Check if selected seat number exists in the seats list

        if (seatExists) {
            return;
        }
        const index1 = selectedseat.indexOf(number);
        const index2 = amount.indexOf(value);

        if (index1 !== -1 && index2 !== -1) {

            const newSelectedSeats = [...selectedseat];
            newSelectedSeats.splice(index1, 1);
            setSelectedSeat(newSelectedSeats);

            const newAmounts = [...amount];
            newAmounts.splice(index2, 1);
            setAmount(newAmounts);
        } else if (selectedseat.length < 6) {
            setSelectedSeat([...selectedseat, number])
            setAmount([...amount, value])
        } else {
            alert("Cannot select more than 6 seats!!");
            return;
        }

        let element = document.getElementById(number);
        if (element) {
            element.classList.toggle("selected");
        }
        axios.post("http://127.0.0.1:8000/api/movies/theater/seats/select/?movie=" + movie_id + "&theater=" + theater_id + "&seat=" + number + "&price=" + value)
            .then((response) => {
                console.log(response)
            },
                (error) => {
                    console.log(error)
                })
            .catch((error) => {
                console.log(error)
            })


    }
    function Booking() {
        let access_token = localStorage.getItem("access_token");
        let values = { movie: movie_id, theater: theater_id, seats: selectedseat, total_cost: amount.reduce((prev, item) => prev + item, 0) };
        console.log(values)
        axios.post(
            "http://127.0.0.1:8000/api/movies/booking/",
            values,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(selectedseat)
        if (selectedseat.length > 0) {
            setTimeout(() => {
                nav('/user/movie/' + movie_id + '/theater/' + theater_id + '/booking', true)
            }, 2000)

        }
        else {
            alert("You have Not select any seat!!")
        }

        setAmount([...amount, []])
        setSeats([...selectedseat, []])
    }


    return (
        <>
            <Navbar></Navbar>
            <div className="tcontainer" style={{ justifyContent: "center", alignItems: "center" }}>
                <div className="col-md-12" style={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "auto" }}>
                    {movie && movie.map((p, i) => (
                        <div className="movidetails">
                            <p style={{ color: "white", fontSize: "1.5em", textShadow: "2px 2px 2px black" }}>Movie: {p.title}</p>
                            
                        </div>
                    ))

                    }
                    {theater && theater.map((p, i) => (
                        <div className="theaterdetails">
                            <p style={{ color: "white", fontSize: "1.5em", textShadow: "2px 2px 2px black" }}>Theater: {p.name}</p>
                            <p style={{ color: "white", fontSize: "1em", textShadow: "2px 2px 2px black" }}>Show Time: {p.timing}</p>
                        </div>

                    ))

                    }

                    <div class="movie-container">



                        <div className="tcontainer" >

                            <ul class="showcase" style={{ color: "white" }} >
                                <li>
                                    <div class="seat selected"></div>
                                    <small>Selected</small>
                                </li>
                                <li>
                                    <div class="seat occupied"></div>
                                    <small>Occupied</small>
                                </li>
                            </ul>
                            <ul class="showcase" style={{ color: "white", display: "flex", flexWrap: "wrap" }} >
                                <li>

                                    <small> A Silver: Rs150</small>
                                </li>
                                <li>

                                    <small> B Gold: Rs200</small>
                                </li>
                                <li>

                                    <small> C Diamond: Rs250</small>
                                </li>
                                <li>

                                    <small> D Platinum: Rs300</small>
                                </li>
                                <li>

                                    <small> E Royal: Rs350</small>
                                </li>
                                <li>

                                    <small> F Super: Rs400</small>
                                </li>
                            </ul>
                            <p style={{ color: "white", fontSize: "2em", textShadow: "2px 2px 5px black" }}>Screen This Side</p>
                            <div className="screen"></div>

                            <div className="seat-row">


                                <div id="A1" className={checkAvailability("A1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A1", 150)}>A1</div>
                                <div id="A2" className={checkAvailability("A2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A2", 150)}>A2</div>
                                <div id="A3" className={checkAvailability("A3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A3", 150)}>A3</div>
                                <div id="A4" className={checkAvailability("A4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A4", 150)}>A4</div>
                                <div id="A5" className={checkAvailability("A5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A5", 150)}>A5</div>
                                <div id="A6" className={checkAvailability("A6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A6", 150)}>A6</div>
                                <div id="A7" className={checkAvailability("A7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A7", 150)}>A7</div>
                                <div id="A8" className={checkAvailability("A8") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("A8", 150)}>A8</div>
                            </div>
                            <div className="seat-row">
                                <div id="B1" className={checkAvailability("B1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B1", 200)}>B1</div>
                                <div id="B2" className={checkAvailability("B2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B2", 200)}>B2</div>
                                <div id="B3" className={checkAvailability("B3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B3", 200)}>B3</div>
                                <div id="B4" className={checkAvailability("B4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B4", 200)}>B4</div>
                                <div id="B5" className={checkAvailability("B5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B5", 200)}>B5</div>
                                <div id="B6" className={checkAvailability("B6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B6", 200)}>B6</div>
                                <div id="B7" className={checkAvailability("B7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B7", 200)}>B7</div>
                                <div id="B8" className={checkAvailability("B8") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("B8", 200)}>B8</div>
                            </div>
                            <div class="seat-row">
                                <div id="C1" className={checkAvailability("C1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C1", 250)}>C1</div>
                                <div id="C2" className={checkAvailability("C2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C2", 250)}>C2</div>
                                <div id="C3" className={checkAvailability("C3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C3", 250)}>C3</div>
                                <div id="C4" className={checkAvailability("C4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C4", 250)}>C4</div>
                                <div id="C5" className={checkAvailability("C5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C5", 250)}>C5</div>
                                <div id="C6" className={checkAvailability("C6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C6", 250)}>C6</div>
                                <div id="C7" className={checkAvailability("C7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C7", 250)}>C7</div>
                                <div id="C8" className={checkAvailability("C8") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("C8", 250)}>C8</div>
                            </div>
                            <div class="seat-row">
                                <div id="D1" className={checkAvailability("D1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D1", 300)}>D1</div>
                                <div id="D2" className={checkAvailability("D2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D2", 300)}>D2</div>
                                <div id="D3" className={checkAvailability("D3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D3", 300)}>D3</div>
                                <div id="D4" className={checkAvailability("D4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D4", 300)}>D4</div>
                                <div id="D5" className={checkAvailability("D5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D5", 300)}>D5</div>
                                <div id="D6" className={checkAvailability("D6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D6", 300)}>D6</div>
                                <div id="D7" className={checkAvailability("D7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D7", 300)}>D7</div>
                                <div id="D8" className={checkAvailability("D8") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("D8", 300)}>D8</div>
                            </div>
                            <div className="seat-row">
                                <div id="E1" className={checkAvailability("E1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E1", 350)}>E1</div>
                                <div id="E2" className={checkAvailability("E2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E2", 350)}>E2</div>
                                <div id="E3" className={checkAvailability("E3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E3", 350)}>E3</div>
                                <div id="E4" className={checkAvailability("E4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E4", 350)}>E4</div>
                                <div id="E5" className={checkAvailability("E5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E5", 350)}>E5</div>
                                <div id="E6" className={checkAvailability("E6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E6", 350)}>E6</div>
                                <div id="E7" className={checkAvailability("E7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E7", 350)}>E7</div>
                                <div id="E8" className={checkAvailability("E7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("E8", 350)}>E8</div>
                            </div>
                            <div className="seat-row">
                                <div id="F1" className={checkAvailability("F1") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F1", 400)}>F1</div>
                                <div id="F2" className={checkAvailability("F2") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F2", 400)}>F2</div>
                                <div id="F3" className={checkAvailability("F3") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F3", 400)}>F3</div>
                                <div id="F4" className={checkAvailability("F4") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F4", 400)}>F4</div>
                                <div id="F5" className={checkAvailability("F5") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F5", 400)}>F5</div>
                                <div id="F6" className={checkAvailability("F6") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F6", 400)}>F6</div>
                                <div id="F7" className={checkAvailability("F7") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F7", 400)}>F7</div>
                                <div id="F8" className={checkAvailability("F8") == false ? "seat" : "seat occupied"} onClick={() => seatSelect("F8", 400)}>F8</div>
                            </div>

                            <p className="text" style={{ color: "white" }}>
                                You have selected <span id="count">{selectedseat.join(",")}</span> seats for the total price of Rs. <span id="total">{amount.reduce((prev, item) => prev + item, 0)} </span>
                            </p>
                            <button className="btn btn-primary" onClick={Booking}>Book Now</button>
                            <br></br>
                        </div>
                    </div>


                </div>

                {/* <div className="col-md-3"></div> */}
            </div>
            <Footer></Footer>
        </>
    )

}



export default TheaterSeats;