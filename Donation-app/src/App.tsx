import React, { useState } from 'react';
import './App.css';
import Select from 'react-select';
import Options from './components/Options';
import visa from './assets/visa_5968299.png'
import master from './assets/business_15801129.png'

function App() {
    const [customAmount, setCustomAmount] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [isDropDown, setIsDropDown] = useState<boolean>(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAmount(e.target.value);
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
        setSelectedAmount(e.target.value); 
    };
    const handleIdeal = ()=>{
        setIsDropDown(!isDropDown);
    }
    const bankOptions = [
        { value: 'ing', label: 'ING' },
        { value: 'abn', label: 'ABN Amro' },
        { value: 'rabo', label: 'Rabo Bank' }
    ];

    return (
        <div className='container-md'>
            <div className='donation-form'>
                <h3>Choose an amount:</h3>
                <form action="" className='form'>
                    <div className="options">
                        {
                            [10,50, 100, 200, 500, 1000, 2000].map((e) => (
                                <Options
                                    key={e}
                                    e={e.toString()}
                                    checked={selectedAmount === e.toString()}
                                    onChange={handleAmountChange}
                                />
                            ))
                        }
                        <label htmlFor='self' className="button-option custom-amount">
                            <input
                                type="text"
                                id='self'
                                name='self'
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                placeholder="€"
                            />
                        </label>
                       
                    </div>
                    </form>
                     <h3>Checkout</h3>
                     <button className='cards'>
                      Pay with card
                      <img src={visa} alt="" className='card-icon' />
                      <img src={master} alt="" className='card-icon'/>
                     </button>
                     <div className="divider">
                            <div className="divider-text-wrapper">
                                <small className="divider-text">Or</small>
                          </div>
                     </div>

                      <button className='cards' onClick={handleIdeal}>Ideal</button>

                      { isDropDown && (
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
                   <div className='paypal-gpay'>
                        <button type='button' className='btn btn-primary'>Paypal</button>
                        <button type='button' className='btn btn-primary'>G-pay</button>
                    </div>
            </div>
        </div>
    );
}

export default App;
