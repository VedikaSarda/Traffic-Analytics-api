# 🚦 Traffic Analytics API

A Node.js REST API that tracks website traffic, logs detailed visitor data, and provides real-time and historical analytics. It supports metrics such as page views, devices, referrers, geolocation, and more — ideal for dashboards and performance insights.

---

## 📦 Features

- Track visits with IP, user-agent, location, device, browser, etc.
- Analytics endpoints for summary, pages, referrers, devices, geo, timeline
- CSV export of all tracked data
- JWT-based authentication
- Rate limiting to prevent abuse
- Real-time stats via Server-Sent Events (SSE)

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/traffic-analytics-api.git
cd traffic-analytics-api
2. Install dependencies

npm install
3. Configure environment variables
Create a .env file in the root:

env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/trafficDB?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey

✅ Make sure your MongoDB Atlas cluster allows your current IP.

4. Seed mock data (optional)
npm run seed
5. Start the server
npm start

📡 API Endpoints
All endpoints prefixed with /stats require a valid JWT token in the Authorization header.

🔐 Auth Header
makefile

Authorization: <your-jwt-token>
📈 GET /stats/summary
Returns total hits, unique visitors, average session duration, bounce rate.

✅ Example Response
json
{
  "totalHits": 500,
  "uniqueVisitors": 250,
  "avgSessionDuration": 0,
  "bounceRate": 0
}
📄 GET /stats/pages
Returns top visited pages sorted by hit count.

🌍 GET /stats/referrers
Breakdown of traffic sources:

direct
social
organic
paid

🕒 GET /stats/timeline
Returns daily visit trends.

🖥️ GET /stats/devices
Breakdown of:
Device (mobile/desktop)
OS
Browser

🌐 GET /stats/geo
Breakdown of visits by:
Country
Region
City

📤 GET /stats/export
Download all traffic data as a .csv file.

📡 GET /stats/live
(Bonus Feature)
Real-time live stats via Server-Sent Events (SSE). Connect from frontend like this:

const source = new EventSource('http://localhost:5000/stats/live');
source.onmessage = (e) => console.log("Live Stats:", JSON.parse(e.data));
📝 POST /track
Tracks a visit. No auth required. Rate-limited.

Request Body
json

{
  "url": "/about",
  "referrer": "https://google.com",
  "sessionId": "abc-123",
  "customTags": ["signup"]
}


🚀 Bonus Features Implemented
✅ Rate Limiting on /track endpoint (30 req/min)

✅ JWT Authentication middleware

✅ Real-time updates via Server-Sent Events

✅ CSV Export endpoint for raw analytics data

✅ Mock Data Seeder using Faker.js

🧪 Testing with Postman
Generate a test token:

js

const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1, username: 'Vedika' }, 'yourSuperSecretKey');
Add the token to your request headers:

makefile
Authorization: <token>


📁 Project Structure

traffic-analytics-api/
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── seeder.js
├── app.js
├── server.js
└── README.md

🧑‍💻 Tech Stack
Node.js
Express
MongoDB + Mongoose
JWT
Faker.js
csv-writer
ip-api (for geolocation)

📬 Feedback or Contributions?
Feel free to open issues or submit PRs. This is a learning project and open to suggestions!
