 Test Case Generator App
This is a Node.js + Express web application that generates relevant test cases from your code or problem statement using Google Gemini AI API. It supports GitHub login authentication and provides a simple dashboard for code input and test case generation.

📦 Features
🔐 GitHub OAuth Authentication

🧠 Gemini AI integration for test case generation

📄 Dashboard to input code/problem statements

✅ Auto-generated test cases rendered using EJS

👤 Logout functionality with session handling

📁 Project Structure
pgsql
Copy
Edit
test-case-generator/
├── routes/
│   ├── auth.js
│   ├── index.js
│   └── generate.js
├── views/
│   ├── index.ejs
│   ├── dashboard.ejs
│   └── result.ejs
├── public/
│   └── styles.css
├── .env
├── app.js
├── package.json
└── README.md
🛠️ Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/test-case-generator.git
cd test-case-generator
2. Install dependencies
bash
Copy
Edit
npm install
3. Create a .env file in the root directory
Add the following environment variables:

env
Copy
Edit
PORT=3000
SESSION_SECRET=your_random_session_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
💡 Get your GitHub OAuth credentials from GitHub Developer Settings
💡 Get your Gemini API key from Google AI Studio
# DataBase Credentials
MONGODB_URI= Your mongodb url

🚀 Run the Project
bash
Copy
Edit
npm start
The app will start on http://localhost:3000

📷 Screenshots
Login Page

Dashboard with code input

Generated test cases result page

🧑‍💻 Contributing
Fork this repo

Create a new branch (git checkout -b feature-branch)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature-branch)

Open a Pull Request

📃 License
This project is licensed under the MIT License.
