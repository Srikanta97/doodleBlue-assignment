import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSlot from './AddSlot';
import ListSlots from './ListSlots';
import Navbar from './Navbar';
import "../GlobalStyle.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateList, setDateList] = useState(null);
  const [success, setSuccess] = useState(null);

  let [slots, setSlots] = useState([]);

  if (dateList) {
    slots = slots.filter(slot => {
      return (slot.specificDate === dateList.toDateString().slice(4));
    })
  }

  useEffect(() => {
    const loadSlots = async () => {
      const receivedSlots = await Axios.get("http://localhost:5000/");
      console.log(receivedSlots.data);
      setSlots(receivedSlots.data);
    }
    loadSlots();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        
        <Route path="/add" exact render={(props) => (
          <>
            <AddSlot className="container container-fluid bg-secondary" selectedDate={selectedDate} setSelectedDate={setSelectedDate} error={error} setError={setError} selectedTime={selectedTime} setSelectedTime={setSelectedTime} slots={slots} setSlots={setSlots} success={success} setSuccess={setSuccess}
            />
          </>
        )} />
        
        <Route path="/" exact render={(props) => (
          <>
            <div>
              <div className="bg-secondary container p-1 d-flex flex-column align-items-center">
                <label htmlFor="getList" className="h4 mt-2">Pick a date to filter</label>
                <DatePicker
                  isClearable
                  selected={dateList}
                  onChange={date => setDateList(date)}
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  id="getList"
                  className="bg-light border-0 m-2 p-1"
                />
              </div>
              <ListSlots slots={slots} />
            </div>
          </>
        )}/>

        </div>
    </BrowserRouter>
  );
}

export default App;
