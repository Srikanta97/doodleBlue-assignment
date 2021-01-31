import React from 'react';
import Brand from '../img/brand.png';

const Navbar = () => {
   return (
      <div className="d-md-flex d-lg-flex justify-content-around bg-dark text-light container container-fluid p-3 text-center">
         <a href="/" className="text-light text-decoration-none">
            <h2 className="d-flex justify-content-center align-items-end">
               <img height="40rem" src={Brand} alt="Brand Logo" />
               <span>doodleBlue</span>
            </h2>
         </a>
         <a href="/add">
            <button
               className="btn btn-outline-info pt-1 pb-1 pr-3 pl-3"
            >
               Add
            </button>
         </a>
      </div>
   );
}

export default Navbar;