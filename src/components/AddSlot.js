import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import Axios from 'axios';

const AddSlot = ({ selectedDate, setSelectedDate, error, setError, selectedTime, setSelectedTime, slots, setSlots, success, setSuccess }) => {

  const doneHandler = async (e) => {
    e.preventDefault();
    const submitDate = selectedDate.toDateString().slice(4);
    let present = false;
    if (selectedDate && selectedTime) {
      let mins = selectedTime.slice(-2);
      if (mins === "00" || mins === "30") {
        slots.forEach(slot => {
          if (slot.specificDate === submitDate && (slot.specificSlot === selectedTime)) {
            setError('Overlaps');
            setSuccess(null);
            setSelectedDate(null);
            setSelectedTime(null);
            present = true;
          } 
        });
        if (!present) {
          setSlots([...slots, { specificDate: submitDate, specificSlot: selectedTime }]);
          setSelectedDate(null);
          setSelectedTime(null);
          setError(null);
          setSuccess("Successfully opened a slot!");
          try {
            const slot = { specificDate: submitDate, specificSlot: selectedTime, booked: false };
            await Axios.post(
                "http://localhost:5000/",
                slot
            ).then((res) => {
                console.log(res.data);
            });
        }
        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        } 
      }
      else {
        setError("Only hourly and half hourly slots can be opened!");
        setSelectedTime(null);
        setSuccess(null);
      }
    }
    else {
      setError("Select both date and a time slot!");
    }
  }

return (
   <div className="bg-secondary container container-fluid p-5 min-vh-100">
      <div className="card bg-dark text-light p-2">
         <form onSubmit={doneHandler} autoComplete="off" className="d-flex flex-column justify-content-around align-items-center m-md-5 m-lg-5">
         <label className="h4" htmlFor="month">Pick a date</label>
         <DatePicker
               isClearable
               selected={selectedDate}
               onChange={ date => setSelectedDate(date)}
               dateFormat="dd-MM-yyyy"
               minDate={new Date()}
               showYearDropdown
               scrollableMonthYearDropdown
               id="month"
               className="bg-light border-0 m-2 p-1 w-100"
            />
         <label className="h4" htmlFor="time">Time slot</label>
         <TimePicker
            onChange={time => setSelectedTime(time)}
            value={selectedTime}
            locale="sv-sv"
               id="time"
               className="bg-light m-2"
         />
         <button type="submit" className="btn btn-outline-info p-2 m-3">Submit</button>
        {error && <h3 className="text-danger m-3 text-center">{error}</h3>}
        {success && <h3 className="text-info m-3 text-center">{success}</h3>}
         </form>
      </div>
   </div>
  );
}

export default AddSlot;
