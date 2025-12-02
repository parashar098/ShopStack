// src/server.ts
import http from 'http';
import app from './app';
import connectDB from './config/database';

// Get port from environment and store in Express.
const PORT = process.env.PORT || 5000;
app.set('port', PORT);

// Create HTTP server.
const server = http.createServer(app);

// Event listener for HTTP server "error" event.
const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event.
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Server listening on ${bind}`);
};

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.warn('Warning: MongoDB is not connected. Starting server in degraded mode.');
    }

    // Listen on provided port, on all network interfaces.
    server.listen(PORT);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Start the server
startServer();

export default server;