import LandingPage from './LandingPage';
import PaymentComponent from './CardInfo';
import {  usePage } from './PageContext';


const Main =()=>{
    const { page, error, selectedAmount } = usePage();

  const handlePage = () => {
    if (page === 0) {
      return <LandingPage />;
    } else {
      return <PaymentComponent amount={selectedAmount} />;
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


}
export default Main