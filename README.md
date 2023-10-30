# Coin Ease: Ethereum-Based Expense Splitting and Tracking

Welcome to the Coin Ease project! Coin Ease is an Ethereum-based web application that simplifies expense sharing among a group of users. It records new payments, splits the payments into dues for assigned members, and displays the transaction details. Users can validate and repay transactions, and once repaid, the transaction is removed from the user's view.

## Overview

Coin Ease is designed to streamline the process of splitting expenses and managing shared transactions. It leverages the Ethereum blockchain for secure and transparent transaction management. The project is built using a combination of third web technologies and solutions for the smart contract backend, while the frontend is powered by React for a responsive and user-friendly experience.

## Features

- Record new payments with details such as the payer, amount, and description.
- Automatically split the payment into dues for assigned members.
- Display a list of transactions, indicating each user's pending dues.
- Users can validate and repay their transactions to clear their dues.
- Once a transaction is repaid, it is removed from the user's view.

## Technologies Used

- **Ethereum**: Utilized for the backend smart contract, providing a secure and transparent way to manage transactions.

- **React**: Powers the frontend of the application, providing an interactive and responsive user interface.

- **ThirdWeb and IPFS**: Specific technologies and solutions used in the Ethereum smart contract will be listed in the project documentation.


## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template vite-javascript-starter
```

You can start editing the page by modifying `src/main.jsx`. The page auto-updates as you edit the file.

On `src/index.jsx`, you'll find our `ThirdwebProvider` wrapping your app,
this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

### Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Screenshots

![Screenshot 1](https://github.com/priyanshu-7938/coinease-splitwise/blob/main/000.png?raw=true)
![Screenshot 2](https://github.com/priyanshu-7938/coinease-splitwise/blob/main/001.png?raw=true)
![Screenshot 3](https://github.com/priyanshu-7938/coinease-splitwise/blob/main/002.png?raw=true)

## Contributing

We welcome contributions to this project. Feel free to fork this repository, make your changes, and submit a pull request. Please make sure to follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
