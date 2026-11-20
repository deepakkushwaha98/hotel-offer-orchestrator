# Hotel Offer Orchestrator

A backend application that aggregates hotel offers from multiple suppliers, compares prices, removes duplicate hotel listings, and returns the best available offers.

Built using Node.js, TypeScript, Express.js, Temporal, Redis, and Docker.

## Project Overview

Hotel Offer Orchestrator provides a centralized API to retrieve and compare hotel offers from multiple suppliers.

Different suppliers may provide different prices for the same hotel. The application fetches offers from both suppliers, identifies duplicate hotels, selects the cheapest offer, and returns the results.

The application uses Temporal to orchestrate supplier data retrieval and Redis to store and filter hotel offers.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| TypeScript | Type-safe development |
| Express.js | REST API development |
| Temporal | Workflow orchestration |
| Redis | Hotel offer storage and price filtering |
| Docker | Application containerization |
| Docker Compose | Multi-container management |

## Architecture

The application consists of the following components:

1. **Express API:** Receives client requests and returns hotel offers.
2. **Supplier APIs:** Two mock suppliers provide hotel information and prices.
3. **Temporal Workflow:** Coordinates the execution of supplier activities.
4. **Temporal Worker:** Executes workflow tasks from the hotel task queue.
5. **Hotel Service:** Combines supplier offers and removes duplicate hotels by selecting the cheapest offer.
6. **Redis:** Stores hotel offers and supports price-range filtering.
7. **Health Controller:** Checks the availability of supplier endpoints.

## Project Structure

```text
hotel-offer-orchestrator/
│
├── src/
│   ├── activities/
│   │   └── hotel.activities.ts
│   │
│   ├── config/
│   │   ├── redis.ts
│   │   └── temporal.ts
│   │
│   ├── controllers/
│   │   ├── health.controller.ts
│   │   ├── hotel.controller.ts
│   │   └── supplier.controller.ts
│   │
│   ├── routes/
│   │   ├── health.routes.ts
│   │   ├── hotel.routes.ts
│   │   └── supplier.routes.ts
│   │
│   ├── services/
│   │   ├── hotel.service.ts
│   │   ├── redis.service.ts
│   │   └── supplier.service.ts
│   │
│   ├── types/
│   │   └── hotel.ts
│   │
│   ├── workflows/
│   │   └── hotel.workflow.ts
│   │
│   ├── app.ts
│   ├── server.ts
│   └── worker.ts
│
├── .dockerignore
├── .gitignore
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Features

- Aggregates hotel offers from multiple suppliers.
- Executes supplier activities concurrently using Temporal.
- Removes duplicate hotel listings.
- Selects the cheapest offer for each hotel.
- Stores hotel offers in Redis.
- Supports minimum and maximum price filtering.
- Provides a health-check endpoint.
- Runs the application and supporting services using Docker Compose.

## API Endpoints

### 1. Application Status

**GET** `/`

Checks whether the application is running.

### 2. Retrieve Hotel Offers

**GET** `/api/hotels?city=delhi`

Retrieves hotel offers from both suppliers, removes duplicates, and returns the cheapest offer for each hotel.

### 3. Filter Hotels by Price

**GET** `/api/hotels?city=delhi&minPrice=5000&maxPrice=6000`

Returns hotels within the specified price range.

### 4. Health Check

**GET** `/health`

Checks the availability of supplier endpoints.

### 5. Supplier APIs

- `GET /supplierA/hotels?city=delhi`
- `GET /supplierB/hotels?city=delhi`

These endpoints provide mock hotel data from the two suppliers.

## Sample API Response

```json
[
  {
    "name": "Holtin",
    "price": 5340,
    "supplier": "Supplier B",
    "commissionPct": 20
  },
  {
    "name": "Radison",
    "price": 5900,
    "supplier": "Supplier A",
    "commissionPct": 13
  },
  {
    "name": "Taj",
    "price": 7500,
    "supplier": "Supplier B",
    "commissionPct": 15
  },
  {
    "name": "Leela",
    "price": 9000,
    "supplier": "Supplier B",
    "commissionPct": 12
  }
]
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Docker Desktop
- Git

### Run Using Docker Compose

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd hotel-offer-orchestrator
```

Start all services:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

The application will be available at:

- API: http://localhost:3000
- Temporal Web UI: http://localhost:8233
- Redis: localhost:6379

### Run Locally

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Start the application:

```bash
npm start
```

Start the Temporal worker separately:

```bash
npm run worker
```

For local execution, Redis and the Temporal server must also be running, and their connection settings must be configured.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run worker` | Start the Temporal worker in development mode |
| `npm run build` | Compile TypeScript |
| `npm start` | Start the compiled application |
| `npm run typecheck` | Check TypeScript types |

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Application port | `3000` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `TEMPORAL_ADDRESS` | Temporal server address | `localhost:7233` |
| `SUPPLIER_BASE_URL` | Supplier API base URL | `http://localhost:3000` |

Docker Compose configures container-specific service addresses automatically.

## Docker Services

The Docker Compose configuration runs four services:

- **App:** Express backend application.
- **Worker:** Temporal workflow worker.
- **Redis:** Stores hotel offers.
- **Temporal:** Workflow orchestration server.

## Future Scope

The project can be extended to integrate real hotel supplier APIs and persistent hotel data storage.

## License

This project is licensed under the ISC License.
