🧠 Intern Fundraising Portal

A modern, full-stack dashboard for interns to track donations, referrals, and rewards.
___________________________________________________________________________________________________________________________________________________________________________________________________________________
🚀 Overview

The Intern Fundraising Portal is a full-stack web app built with:

🔥 Flask for the backend

🐬 MySQL for data persistence

⚡ Tailwind CSS + JavaScript for a sleek frontend

Interns can log in with a referral code to view their personal fundraising stats, track progress toward goals, and see how they stack up on the leaderboard.
___________________________________________________________________________________________________________________________________________________________________________________________________________________
✨ Features

✅ Login Page – Enter referral code to access your personalized dashboard

✅ Signup Form – Static form for adding new interns (UI only)

✅ Dashboard – View:

Intern Name + Referral Code

Total Donations & Referrals

Average Donation

Goal Completion with Progress Bar

Tiered Rewards: 🥉 Bronze, 🥈 Silver, 🥇 Gold

✅ Leaderboard – Displays top 5 interns by donation amount

✅ Backend API – Fully RESTful (/intern, /leaderboard) with MySQL integration

✅ Responsive Design – Clean and mobile-friendly layout
___________________________________________________________________________________________________________________________________________________________________________________________________________________
🧰 Tech Stack:

Layer	                              Tools Used
🧠 Backend	            Flask, Flask-CORS, MySQL Connector
🗄️ Database	            MySQL
🎨 Frontend	            HTML, Tailwind CSS, JavaScript
🧪 Testing	            Postman
___________________________________________________________________________________________________________________________________________________________________________________________________________________
📂 Project Structure

intern-fundraising-portal/
|----backened/
|    |----app.py             #Flask app & routing
|    |----dbHelper.py        #MySQL connection logic
|    |----schema.sql         #Database schema + dummy data
|----frontened/
|    |----index.html         #Frontened UI
|    |----script.js          #API calls & UI logic
|----README.md         

___________________________________________________________________________________________________________________________________________________________________________________________________________________
⚙️ Setup Instructions
1. 🧠 Backend Setup
  # Install dependencies
  pip install flask flask-cors mysql-connector-python

  Start MySQL:
    mysql -u root -p
    Run the schema.sql to create the required database & tables.
    Update MySQL credentials in dbHelper.py.

  Start the Flask server:
    python app.py

2. 🎨 Frontend Setup
Open index.html in VS Code and run with Live Server,
or use:
   python -m http.server 8000
  Ensure Flask backend is running at http://localhost:5000.

____________________________________________________________________________________________________________________________________________________________________________________________________________________
🔍 API Testing
Use Postman or your browser to test the APIs:

GET http://localhost:5000/intern?referral=john2025
GET http://localhost:5000/leaderboard
Try test referral codes like:
      john2025
      jane2025
____________________________________________________________________________________________________________________________________________________________________________________________________________________
📌 Assumptions
Signup form is static; backend signup logic is not implemented yet

Fundraising goal is 15,000 INR (hardcoded for demo)

MySQL credentials are hardcoded for local use (recommend .env in production)
____________________________________________________________________________________________________________________________________________________________________________________________________________________
🌱 Future Enhancements
    ⏳ Loading spinners for async API calls
    🔐 Backend logic for signup and basic auth
    🧼 Input sanitization & validation
    ♿ Accessibility improvements (ARIA labels)
____________________________________________________________________________________________________________________________________________________________________________________________________________________
