import React from 'react';
import { usePage } from './PageContext';
import './CardInfo.css'

const CardInfo: React.FC = () => {
  const { selectedAmount, setPage, page } = usePage();

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className='form-head'>
        <h2 onClick={handleBackButtonClick} className='prev-btn'>
          Selected amount: <span>€{selectedAmount}</span>
          </h2>
        <h2 className='active'>Card Info</h2>
      </div>
      <div className="card-info-body">
            <input type="text" className="card" placeholder="Name on card" required/>
            <input type="text" className="card" placeholder="Card Number"  required/>
              <div className="grid">
                        <input
                            type='month'
                            className="card-2"
                            placeholder="Exp."
                            required 
                        />
                        <input type="text" className="card-2" placeholder="VCC" required/>
               </div>
            <button type="submit" className="card">Donate</button>
      </div>
   </>
  );
};

export default CardInfo;
