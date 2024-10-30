# API Overview
The boni-agent-api is designed to manage agents and track their associated calls. The API has two main sections: agent and calls, each with CRUD and analytical endpoints to handle data operations.

# Main Testing Endpoint
GET `/calls/stats/from` <br>

Purpose: Retrieves call records within a specified time range, showing `totalcalls`, `connectedCalls` and `notConnectedCalls`. <br>

Query Parameters:
- `startTime` (required): The starting point of the time range (UNIX timestamp, 10 digits).
- `endTime` (required): The ending point of the time range (UNIX timestamp, 10 digits).
- `agentId` (optional): When provided, fetches statistics specifically for the agent with this ID.

# Some Example Requests
GET: `https://boni-agent-api.onrender.com/calls/stats/from?startTime=1600000000&endTime=1735000000`
#### Example Response:
```json
[
    {
        "agent": {
            "_id": "6721209b1a063fa6c037c827",
            "name": "Agent2",
            "email": "agent2@gmail.com"
        },
        "totalCalls": 2,
        "connectedCalls": 1,
        "notConnectedCalls": 1
    },
    {
        "agent": {
            "_id": "672120a61a063fa6c037c82b",
            "name": "Agent3",
            "email": "agent3@gmail.com"
        },
        "totalCalls": 3,
        "connectedCalls": 2,
        "notConnectedCalls": 1
    }
]
```
GET: `https://boni-agent-api.onrender.com/calls/stats/from?startTime=1600000000&endTime=1735000000&agentId=6721209b1a063fa6c037c827`
#### Example Response:
```json
{
    "agent": {
        "_id": "6721209b1a063fa6c037c827",
        "name": "Agent2",
        "email": "agent2@gmail.com"
    },
    "totalCalls": 2,
    "connectedCalls": 1,
    "notConnectedCalls": 1
}
```


# All Agent Endpoints
- GET `/agent` - Retrieve all agents.
- GET `/agent/:id` - Retrieve a specific agent by ID.
- POST `/agent` - Create a new agent.
- PUT `/agent/:id` - Update agent information by ID.
- DELETE `/agent/:id` - Delete an agent by ID.

# All Call Endpoints
- GET `/calls` - Retrieve all call records.
- GET `/calls/:id` - Retrieve a specific call by ID.
- POST `/calls` - Log a new call.
- GET `/calls/agent/:agentId` - Retrieve all calls associated with a specific agent.
- GET `/calls/stats/from` - Fetches call records for the given "startTime to endTime" timestamps in "UNIX" format (10 digits) along with connected / not connected details.

