import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "../CssComponents/bookings.css"

export const Bookings = () => {
    const [bookingData, setBookingData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [inputOpenId, setInputOpenId] = useState(null);
    const [newSeats, setNewSeats] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem("bookingData");
        if (storedData) {
            setBookingData(JSON.parse(storedData));
        }
        setLoading(false);
    }, []);

    const handleRemoveBooking = (id) => {
        const updatedBookingData = bookingData.filter(booking => booking.id !== id);
        localStorage.setItem("bookingData", JSON.stringify(updatedBookingData));
        setBookingData(updatedBookingData);
        toast.success("Booking removed successfully");
    };

    const editBooking = (id) => {
        if (inputOpenId === id) {
            if (Number(newSeats) < 1) {
                toast.error("Minimum seats should be 1");
                return;
            }
            const updatedBookings = bookingData.map(booking => {
                if (booking.id === id) {
                    return { ...booking, seats: Number(newSeats) };
                }
                return booking;
            });
            localStorage.setItem("bookingData", JSON.stringify(updatedBookings));
            setBookingData(updatedBookings);
            toast.success("Seats updated successfully");
            setInputOpenId(null);
            setNewSeats('');
        } else {
            const bookingToEdit = bookingData.find(booking => booking.id === id);
            setNewSeats(bookingToEdit.seats);
            setInputOpenId(id);
        }
    };

    const getTotalPrice = () => {
        return bookingData.reduce((total, booking) => total + (booking.price * booking.seats), 0);
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading... please wait...</p>
            ) : (
                <div>
                    <div className="cards-box">
                        {bookingData.map((movie) => (
                            <div className="card" key={movie.id}>
                                <img src={movie.img} alt={movie.movieName} />
                                <h3>Movie: {movie.movieName}</h3>
                                <h4>Rating: {movie.rating}</h4>
                                <h4>Price: $ {movie.price}</h4>
                                <h4>Seats: {movie.seats}</h4>
                                <button onClick={() => handleRemoveBooking(movie.id)}>Cancel Booking</button>

                                {inputOpenId === movie.id && (
                                    <>
                                        <input 
                                            type="number" 
                                            value={newSeats} 
                                            onChange={(e) => setNewSeats(e.target.value)} 
                                            placeholder='Enter new number of seats' 
                                        />
                                    </>
                                )}
                                <br></br>
                                <br></br>
                                <button onClick={() => editBooking(movie.id)} className="edit">
                                    {inputOpenId === movie.id ? "Save" : "Edit"}
                                </button>
                            </div>
                        ))}
                    </div>
                    <p>Total Price: $ {getTotalPrice()}</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
