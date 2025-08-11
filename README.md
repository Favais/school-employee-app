# School Employee Management System

A web-based School Employee Management System built with **React**, **Vite**, **Ant Design**, and **TailwindCSS**. This project allows school administrators to manage employees, handle leave requests, and perform authentication with a modern UI and mock backend.

## Features

- **Authentication**: Secure login for management/admin users.
- **Employee Management**: View, add, and manage employee records.
- **Leave Management**: View and process leave requests.
- **Role-based Access**: Only admins can access sensitive features.
- **Mock Backend**: Uses [MSW](https://mswjs.io/) for API mocking during development.
- **Responsive UI**: Built with Ant Design and TailwindCSS for a modern look.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd school-employee-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the developement server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser: Visit http://localhost:5173 (or the port shown in your terminal).**

   Build for Production
   ```sh
   npm run build
   # or
   yarn build
   ```

## Mock Data & Authentication

The app uses MSW for mocking API endpoints.
Default admin credentials (see src/mocks/db.js):  

__Staff ID: 20250701__

__Password: 123 (hashed in mock DB, see code for actual value)__

## Technologies Used
React
Vite  
Ant Design  
TailwindCSS  
MSW (Mock Service Worker)  
Axios  
bcryptjs (for password hashing in mocks)  
jose (JWT handling)  

