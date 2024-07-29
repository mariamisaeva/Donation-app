import React from 'react';

import usePaymentStatus from './PaymentStatus';


const Status: React.FC = () => {
  const status = usePaymentStatus();

  return <div>{status}</div>;
};

export default Status;
