const corsOptions = {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
  };
  
  const corsMiddleware = cors(corsOptions);