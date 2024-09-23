import express, { Express } from 'express';
import fateboundRouter from './routes/fatebounds';
const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation - Bosses</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 20px;
            height: 100%;
            overflow-y: auto; /* Enable scrolling */
          }
          h1, h2 {
            color: #3498db;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            margin-bottom: 20px;
            color: #555;
          }
          table {
            width: 100%;
            max-width: 1000px;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .api-info {
            text-align: left;
            margin-top: 40px;
            color: #777;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
        </style>
    </head>
    <body>
      <div class="container">
        <h1>Boss API Documentation</h1>
        <p>Hey, you're running smooth on Express! 🔥</p>
        <p>Welcome to the Boss API. Here you can retrieve details about bosses, their equipment, and strategies for defeating them.</p>
        
        <div class="api-info">
          <h2>Available Endpoints</h2>

          <h3>Get All Bosses</h3>
          <p><strong>GET</strong> <code>/api/boss</code></p>
          <p>Retrieve a list of all bosses in the system.</p>

          <h3>Get Boss by ID or Name</h3>
          <p><strong>GET</strong> <code>/api/boss/:id</code></p>
          <p>Retrieve details for a specific boss by ID or by name.</p>

          <h3>Create a New Boss</h3>
          <p><strong>POST</strong> <code>/api/boss</code></p>
          <p>Create a new boss by providing the required details.</p>

          <h2>Bosses Data Structure</h2>
          <p>The following fields are used to describe a boss:</p>

          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Boss Name</strong></td>
                <td>String</td>
                <td>The name of the boss, e.g., "The Breaker".</td>
              </tr>
              <tr>
                <td><strong>Boss Element</strong></td>
                <td>String</td>
                <td>The elemental alignment of the boss, e.g., "Fire", "Water", "Earth".</td>
              </tr>
              <tr>
                <td><strong>Boss Information</strong></td>
                <td>String</td>
                <td>General information about the boss.</td>
              </tr>
              <tr>
                <td><strong>Boss Equipment Drop</strong></td>
                <td>String</td>
                <td>The equipment dropped by the boss, e.g., "Sword of Destiny".</td>
              </tr>
              <tr>
                <td><strong>Boss Appearance</strong></td>
                <td>String</td>
                <td>A description of what the boss looks like.</td>
              </tr>
              <tr>
                <td><strong>Boss Defeat Strategies</strong></td>
                <td>String</td>
                <td>Tips and strategies for defeating the boss.</td>
              </tr>
            </tbody>
          </table>

          <h2>Example Requests</h2>
          <h3>Get All Bosses</h3>
          <pre><code>
GET /api/boss HTTP/1.1
Host: localhost:3001
          </code></pre>

          <h3>Get Boss by ID or Name</h3>
          <pre><code>
GET /api/boss/2 HTTP/1.1
Host: localhost:3001

GET /api/boss/the-breaker HTTP/1.1
Host: localhost:3001
          </code></pre>

          <h3>Create a New Boss</h3>
          <pre><code>
POST /api/boss HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "name": "The Breaker",
  "element": "Earth",
  "information": "A colossal being capable of causing earthquakes.",
  "equipmentDrop": "Hammer of Destruction",
  "appearance": "A massive rock golem with cracks of molten lava.",
  "defeatStrats": "Use ice-based weapons to weaken its core."
}
          </code></pre>

        </div>
      </div>
    </body>
    </html>
  `);
});

app.use('/fatebound', fateboundRouter);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
