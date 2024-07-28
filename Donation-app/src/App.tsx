import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import CardInfo from './components/CardInfo';
import { PageProvider, usePage } from './components/PageContext';

const App: React.FC = () => {
  const { page, error } = usePage();

  const handlePage = () => {
    if (page === 0) {
      return <LandingPage />;
    } else {
      return <CardInfo />;
    }
  };

  return (
    <div className='container-md'>
      <div className='donation-form'>
        {
        error &&  (
          <div className='error'>{error}</div>
        )
        }
        {
        handlePage()
        }
      </div>
    </div>
  );
};

const AppWithProvider: React.FC = () => (
  <PageProvider>
    <App />
  </PageProvider>
);

export default AppWithProvider;
