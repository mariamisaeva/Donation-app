import React from 'react';
import './Options.css';

interface OptionsProps {
    e: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Options: React.FC<OptionsProps> = ({ e, checked, onChange }) => {
    return (
        <label htmlFor={e} className={`button-option ${checked ? 'selected' : ''}`}>
            <input
                type="radio"
                id={e}
                name="amount"
                value={e}
                checked={checked}
                onChange={onChange}
            />
            <span>€{e}</span>
        </label>
    );
};

export default Options;
