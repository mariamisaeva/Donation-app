import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import './App.css';
import { PageProvider } from './components/PageContext';
import Status from './components/Status';

const App = () => {
  return (
    <Router>
      <PageProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/payment/status" element={<Status />} />
        </Routes>
      </PageProvider>
    </Router>
  );
};

export default App;




// card payment endpoint
// const SECRET_KEY = process.env.SECRET_API;

// if (!SECRET_KEY) {
//   throw new Error(
//     "Stripe secret key is not defined in the environment variables."
//   );
// }
// app.post("/card-payment", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "eur",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.json({ client_secret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
