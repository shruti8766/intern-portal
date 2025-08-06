from flask import Flask, jsonify, request  # Added request import
from flask_cors import CORS
import dbHelper

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h2>Welcome to the Intern Fundraising API</h2>"

@app.route('/intern', methods=['GET'])
def intern():
    referral = request.args.get('referral')  # Now request is defined
    if referral:
        data = dbHelper.get_intern_by_referral(referral)
    else:
        data = dbHelper.get_intern_data()
    return jsonify(data)

@app.route('/interns', methods=['GET'])
def interns():
    data = dbHelper.get_all_interns()
    return jsonify(data)

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    data = dbHelper.get_leaderboard()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)