import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePaymentStatus from './usePaymentStatus.tsx';
import yes from '../assets/yes.png';
import fail from '../assets/remove.png';
import './Status.css';

const Status: React.FC = () => {
  const { status } = usePaymentStatus();
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <div className='container'>
      <div className='box'>
        {status?.includes('processing') && (
          <div className='proc'></div>
        )}
        {status?.includes('Success') && (
          <>
            <h3>Your contribution will go to the right place.</h3>
            <img src={yes} alt="Success" className='st-img' />
            {status}
          </>
        )}
        {status?.includes('failed') && (
          <>
            <img src={fail} alt="Failure" className='st-img' />
            {status}
          </>
        )}
        {status?.includes('processing') || status?.includes('Success') || status?.includes('failed') ? (
          <button onClick={handleBackClick}>Back</button> 
        ) : null}
      </div>
    </div>
  );
};

export default Status;