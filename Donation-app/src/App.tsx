import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Main from './components/Main';
import './App.css';
import { PageProvider } from './components/PageContext';
import Status from './components/Status';

const stripePromise = loadStripe(
  'pk_test_51PhZaY2K9MkrEBt5paCpLGfNLi71q3FsmuXl0OpMgtbJb1sGifqo3fgknIWSUCl8fstVtxhrGN6b2kmdSTImpcQL00JuL23sCW',
);

const App = () => {
  return (
    <Router>
      <PageProvider>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/payment/status" element={<Status />} />
          </Routes>
        </Elements>
      </PageProvider>
    </Router>
  );
};

export default App;
