# Full Stack Manager App - API

A TypeScript-based Express.js API for managing tasks with PostgreSQL database integration.

## Technologies Used

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Environment Management**: dotenv
- **Logging**: Morgan
- **CORS**: cors
- **Development Tools**:
  - TypeScript
  - ESLint
  - Nodemon

## Prerequisites

- Node.js (>=18.0.0)
- PostgreSQL
- npm or yarn

## Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/lucasferreiragit/server-tasks-manager
   cd api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL locally**

   ```bash
   # Create a new database
   createdb full_stack_manager

   # Or using psql
   psql
   CREATE DATABASE full_stack_manager;
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/full_stack_manager
   NODE_ENV=development
   ```

5. **Database Setup**
   The application will automatically create the necessary tables when you start the server.

## Running the Application

1. **Development Mode**

   ```bash
   npm run dev
   ```

   This will start the server with hot-reloading enabled.

2. **Production Mode**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Development

- **Type Checking**: The project uses TypeScript for type safety
- **Linting**: ESLint is configured for code quality
- **Hot Reloading**: Nodemon is used for development

## Database Configuration

The application uses Sequelize as the ORM with the following configuration:

- SSL enabled for production
- Connection pooling for better performance
- Automatic table creation in development mode

  
## Deployment

The application is deployed on Render:

- Free tier with automatic sleep after 15 minutes of inactivity
- First request after sleep might take longer to respond (cold start)
- Connection pooling helps maintain database connections
- Environment variables are managed through Render's dashboard
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
