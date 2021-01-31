import React from 'react';

const ListSlots = ({slots}) => {
   return (
      <div className="container table-responsive container-fluid bg-secondary d-lg-flex justify-content-around w-100 min-vh-100">
         <table className="table table-bordered table-dark m-1">
            <thead className="text-center">
               <tr className="text-center">
                  <th>Morning Slots</th>
               </tr>
            </thead>
            <tbody>
               {slots.map(slot => {
                  return Number(slot.specificSlot.slice(0, 2)) <= 14 ?
                     <tr key={Math.random() * 100000} className="text-center text-light"><td>{slot.specificSlot}</td></tr> : ''
               })}
            </tbody>
         </table>
         <table className="table table-bordered table-dark m-1">
            <thead>
               <tr className="text-center">
                  <th>Evening Slots</th>
               </tr>
            </thead>
            <tbody>
               {slots.map(slot => {
                  return Number(slot.specificSlot.slice(0, 2)) > 14 ? 
                     <tr key={Math.random() * 100000} className="text-center text-light"><td>{slot.specificSlot}</td></tr> : ''
               })}
            </tbody>
         </table>
      </div>
   );
}

export default ListSlots;