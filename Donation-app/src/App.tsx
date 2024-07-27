import React, { useState } from 'react';
import './App.css';
import Options from './components/Options';

function App() {
    const [customAmount, setCustomAmount] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAmount(e.target.value);
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
        setSelectedAmount(e.target.value); 
    };

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
                     <h3>Checkout</h3>
                    <button type='button' className='btn btn-primary m-1'>Paypal</button>
                    <button type='button' className='btn btn-primary m-1'>G-pay</button>
                </form>
            </div>
        </div>
    );
}

export default App;
