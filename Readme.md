# Email Optimization Platform

This project is a web application for optimizing email engagement metrics through A/B testing. It provides marketers with a platform to conduct experiments on various elements of their email campaigns and analyze the results to improve engagement rates.

## Features

- **Experiment Creation**: Marketers can create new experiments by defining the name, description, and variants of the email campaign elements (e.g., subject lines, sender names).
- **Real-time Dashboard**: The platform offers a real-time dashboard that visualizes the performance of each email variant, including metrics like open rates, click-through rates, and engagement rates.
- **Experiment Management**: Users can manage their experiments by updating, deleting, or pausing them as needed.
- **Integration with Email Service Providers**: The application integrates with email service providers to send test emails and track engagement metrics.
- **Data Analysis and Insights**: Smart algorithms analyze experiment data and provide insights and suggestions for improving email campaigns.

## Technologies Used

- Frontend: React.js, HTML, CSS
- Backend: Node.js, Express.js, MongoDB,Mailgun
- Other: Axios (HTTP client), React Router (for routing), React Hooks (for state management), JWT (for authentication)

## Installation

1. Clone the repository: `git clone https://github.com/Ashishraj003/A-B-email-testing.git`
2. Navigate to the project directory: `cd A-B-Testing-platform`
3. Install dependencies:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Define environment variables like `PORT`, `MONGODB_URI`, `JWT_SECRET`, etc.
5. Start the development server:
   - Frontend: `cd frontend && npm start`
   - Backend: `cd backend && npm start`

## Usage

- Register/Login: Users can register or log in to the platform using their email and password.
- Create Experiment: Once logged in, users can create new experiments by providing the necessary details and variants.
- View Dashboard: Users can view the real-time dashboard to monitor the performance of their experiments.
- Manage Experiments: Users can update, delete, or pause their experiments as needed.
- Analyze Data: The platform provides insights and suggestions based on the analysis of experiment data.

