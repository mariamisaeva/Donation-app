# Donation App

### Live Demo: [Donation App](https://66b39e4b4d3f951d06df5bfc--euphonious-biscotti-76a118.netlify.app/)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Error Handling](#error-handling)
6. [Payment Methods](#payment-methods)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The Donation App is a simple, user-friendly application designed to facilitate donations. Users can easily select a pre-defined donation amount or enter their own custom amount. The app supports payments via PayPal or credit card, ensuring a secure and flexible donation process.

## Features

- **Pre-defined Donation Amounts:** Users can select from a set of predefined donation amounts.
- **Custom Donation Amount:** Users have the option to enter a custom donation amount.
- **Payment Methods:** Secure payments through PayPal or credit card.
- **Error Handling:** Users are prompted with an error message if no amount is selected or entered before attempting to proceed with payment.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Installation

If you want to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/donation-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd donation-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your web browser and navigate to the URL provided in the terminal to access the application.

## Usage

1. **Selecting a Donation Amount:**

   - Choose a predefined amount by clicking on one of the options.
   - Alternatively, enter a custom amount in the provided input field.

2. **Proceeding to Payment:**
   - Once an amount is selected or entered, choose your preferred payment method: PayPal or credit card.
   - Follow the on-screen instructions to complete your donation.

## Error Handling

1. **Missing Donation Amount:**

   - If you attempt to proceed without selecting or entering a donation amount, an error message will appear prompting you to choose or enter an amount. This ensures that all users make a conscious decision about the donation amount before moving forward.

2. **Successful Payment:**

   - After a successful payment, the app will display a confirmation message indicating that the payment was successful. This helps reassure users that their donation has been processed correctly.

3. **Cancelled Payment:**
   - If you decide to cancel the payment process, the app will redirect you to a message indicating that the payment was cancelled. This ensures that users are aware that no transaction was completed.

## Payment Methods

- **PayPal:** You can donate securely using your PayPal account.
- **Credit Card:** If you prefer, you can donate using your credit card. The app supports all major credit cards.

## Contributing

We welcome contributions to improve the app! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes.
4. Commit and push your changes:
   ```bash
   git commit -m "Add new feature"
   git push origin feature-name
   ```
5. Create a Pull Request explaining your changes.
