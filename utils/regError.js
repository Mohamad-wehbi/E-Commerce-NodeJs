// Handle rejection outside express
const handleRejection = (server) => {
  process.on("unhandledRejection", (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
    });
  });
};

module.exports = handleRejection;
