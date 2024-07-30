import React from 'react';
import usePaymentStatus from './usePaymentStatus.tsx';

const Status: React.FC = () => {
  const status = usePaymentStatus();

  return <div>{status}</div>;
};

export default Status;
