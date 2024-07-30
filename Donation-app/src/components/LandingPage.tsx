import React, { useState } from 'react';
import Select from 'react-select';
import { usePage } from './PageContext';
import Options from './Options';
import visa from '../assets/visa_5968299.png';
import master from '../assets/business_15801129.png';
import PaypalButton from './PayPal-Btn/PaypalButton';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const LandingPage: React.FC = () => {
  const { page, setPage, setSelectedAmount, selectedAmount, setError } =
    usePage();
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(Number(e.target.value));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(Number(e.target.value));
  };
  const handlePage = () => {
    if (selectedAmount) {
      setError(null);
      setPage(page + 1);
    } else {
      setError('Please choose a contribution amount before continuing!');
    }
  };
  const handleIdeal = () => {
    setIsDropDown(!isDropDown);
  };

  const bankOptions = [
    { value: 'ing', label: 'ING' },
    { value: 'abn', label: 'ABN Amro' },
    { value: 'rabo', label: 'Rabo Bank' },
  ];

  return (
    <>
      <div className="form-head">
        <h3>Choose an amount:</h3>
      </div>
      <form className="form">
        <div className="options">
          {[10, 50, 100, 200, 500, 1000, 2000].map((amount) => (
            <Options
              key={amount}
              e={amount.toString()}
              checked={selectedAmount === amount}
              onChange={handleAmountChange}
            />
          ))}
          <label htmlFor="self" className="button-option custom-amount">
            <input
              type="text"
              id="self"
              name="self"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="€"
            />
          </label>
        </div>
      </form>
      <h3>Checkout</h3>
      <button className="cards" onClick={handlePage}>
        Pay with card
        <img src={visa} alt="Visa" className="card-icon" />
        <img src={master} alt="Mastercard" className="card-icon" />
      </button>
      <div className="divider">
        <div className="divider-text-wrapper">
          <small className="divider-text">Or</small>
        </div>
      </div>
      <button className="cards" onClick={handleIdeal}>
        Ideal
      </button>
      {isDropDown && (
        <Select
          options={bankOptions}
          className="banks"
          placeholder="Select Your Bank"
        />
      )}
      <div className="divider">
        <div className="divider-text-wrapper">
          <small className="divider-text">Or</small>
        </div>
      </div>
      <div className="paypal-gpay">
        {/* <button type="button" className="btn btn-primary">
          Paypal
        </button> */}

        <PaypalButton amount={selectedAmount ?? 0} />

        <button type="button">G-pay</button>
      </div>
    </>
  );
};

export default LandingPage;
