# RentKr

## Overview

RentKr is a rental platform that allows users to rent various daily-use products, including electronics, clothing, books, and two-wheelers. It simplifies the rental process by connecting individuals who need short-term access to products with those who are willing to lend them out. Whether you need a gadget for a few days, a vehicle for a weekend trip, or a book to read, RentKr provides a seamless solution for finding and renting these items.

## Features

- Browse a wide variety of products available for rent.
- Easy rental process with a user-friendly interface.
- Filter products by categories (electronics, wearables, books, two-wheelers).
- Track and manage rental status (pending, active, returned).
- Secure login and registration system for users.
- Rental history and ratings for transparency.
  
## Technologies Used

- **MongoDB**: Database for storing user information, product listings, and rental data.
- **Express**: Backend framework for building REST APIs.
- **React**: Frontend library for building a dynamic user interface.
- **Node.js**: Server-side runtime environment.

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RentKr.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RentKr
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   npm install
   cd client
   npm install
   ```
4. Set up environment variables for the project:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for JWT authentication.
   
5. Run the development servers:
   ```bash
   # Backend
   npm start

   # Frontend (in the 'client' directory)
   npm start
   ```

6. Access the app locally at `http://localhost:3000`.

## Usage

- **Sign Up**: Create an account to start renting or listing items.
- **Browse Products**: View available items for rent by categories or search for specific products.
- **Rent an Item**: Choose a product, review rental terms, and confirm the rental.
- **Manage Rentals**: Track rental duration, return dates, and history.

## Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.
