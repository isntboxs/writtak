# Writtak

Writtak is a modern web application built with Next.js, React, and Prisma, designed for creating and sharing posts in a community-driven platform.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Post Management**: Create, read, update, and delete posts
- **Comment System**: Engage with posts through comments
- **Upvoting System**: Upvote posts and comments
- **Community Features**: Join communities and participate in discussions
- **Responsive Design**: Beautiful UI that works across all devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

### Frontend

- **Next.js 15**: React framework with server-side rendering and routing
- **React 19**: UI library for building interactive interfaces
- **TailwindCSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Tanstack Query**: Data fetching and state management
- **React Hook Form**: Form validation and handling
- **Zod**: TypeScript-first schema validation

### Backend

- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Type-safe database client
- **PostgreSQL**: Relational database

### Authentication

- **Better Auth**: Authentication library for Next.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/writtak.git
   cd writtak
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/writtak"
   ```

4. Run database migrations

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses a PostgreSQL database with the following main models:

- **User**: User accounts and profiles
- **Post**: User-created content
- **Comment**: Responses to posts
- **Community**: Groups for organizing content
- **Upvotes**: Tracking post and comment popularity

## Deployment

The application can be deployed to various platforms:

1. Build the application

   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
