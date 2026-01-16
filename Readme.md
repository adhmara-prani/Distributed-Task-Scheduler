# Distributed Ride Scheduler

Real-time ride-sharing platform with distributed architecture handling
concurrent ride assignments with JWT-secured authentication.

## Key Features

- **JWT based authentication** using Node.js and Express.js
- **Race condition prevention** via PostgreSQL row-level locking
- **Real-time updates** through WebSocket bidirectional communication
- **Event-driven architecture** with Apache Kafka message streaming
- **Interactive dashboards** for both users and drivers

## Architecture / Tools

- Node.js/Express backend services
- PostgreSQL with connection pooling
- Kafka for async event processing
- WebSocket server for live updates
- React frontend with real-time UI

## Performance Metrics

- **TO BE ADDED SHORTLY...**

## Quick Start (< 5 minutes)

### Prerequisites

- Docker Desktop
- Node.js 18+ (preferably v22 or later)

### Setup

```bash
# Clone repository
git clone https://github.com/adhmara-prani/Distributed-Task-Scheduler
cd Distributed-Task-Scheduler

# Start all services (PostgreSQL and Kafka) in the background
docker-compose up -d

# Install dependencies and start frontend
npm install
npm run dev
```

**Access:**

- Frontend: http://localhost:3000
- Backend / API: http://localhost:5000

## Testing

- **Still cooking, check back later...**

## Demo Video and Screenshots

- **Editing my masterpiece, kindly wait...**

## Future Enhancements

- Redis-based distributed locking for horizontal scaling
- GraphQL API for flexible querying
- Advanced ride-pooling algorithms

## Lessons Learned

- Kafka producer and consumer group rebalancing challenges
- WebSocket connection management at scale

## License

MIT

```

---

**Clean code standards:**
- Consistent naming conventions
- Proper error handling everywhere
- Comments for complex logic only
- No hardcoded values (use .env)

**Project structure:**
```

-- backend
/controllers
/db
/routes
/utils

-- frontend
/public
/src
/animations
/api
/assets
/components
/context
/pages

-- root
docker-compose.yml
