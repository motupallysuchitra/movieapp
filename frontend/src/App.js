// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './Home/home';
import Login from './Register/login';
import Registration from './Register/register';
import ForgetPassword from './Register/Forgetpassword';
import SingleMovie from './Moviepage/SingleMovie';
import TheaterSeats from './TheaterPage/theaterseats';
import Bookingpage from './BookingPage/booking';
import UserBookings from './BookingPage/userbookings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<Registration></Registration>}></Route>
        <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
        <Route path='/movie/:id'element={<SingleMovie/>}></Route>
        <Route path='/movie/:movie_id/theater/:theater_id' element={<TheaterSeats/>}></Route>
        <Route path='/user/movie/:movie_id/theater/:theater_id/booking' element={<Bookingpage></Bookingpage>}></Route>
        <Route path='/user/bookings' element={<UserBookings/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
