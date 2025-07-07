// Simple in-memory rate limiter (for production use Redis or similar)
const requestCounts = new Map();

function rateLimiter(windowMs = 15 * 60 * 1000, maxRequests = 100) {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    for (const [ip, data] of requestCounts.entries()) {
      data.requests = data.requests.filter(
        (timestamp) => timestamp > windowStart
      );
      if (data.requests.length === 0) {
        requestCounts.delete(ip);
      }
    }

    // Get or create client data
    if (!requestCounts.has(clientIP)) {
      requestCounts.set(clientIP, { requests: [] });
    }

    const clientData = requestCounts.get(clientIP);

    // Filter recent requests
    clientData.requests = clientData.requests.filter(
      (timestamp) => timestamp > windowStart
    );

    // Check rate limit
    if (clientData.requests.length >= maxRequests) {
      return res.status(429).json({
        error: "Too many requests, please try again later.",
      });
    }

    // Add current request
    clientData.requests.push(now);

    next();
  };
}

// Different rate limits for different endpoints
const authLimiter = rateLimiter(15 * 60 * 1000, 5); // 5 auth attempts per 15 minutes
const generalLimiter = rateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes

module.exports = {
  authLimiter,
  generalLimiter,
};
