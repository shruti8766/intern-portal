import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="123456",
            database="intern_portal"
        )
    except Error as e:
        print(f"Database connection error: {e}")
        return None


def get_intern_by_referral(referral_code):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if not conn:
            print("Failed to establish database connection")
            return None

        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT 
                name, 
                referral_code, 
                donations, 
                referrals, 
                goal_completion 
            FROM interns 
            WHERE referral_code = %s
        """
        cursor.execute(query, (referral_code,))
        data = cursor.fetchone()

        if not data:
            print(f"No intern found with referral code: {referral_code}")
            return None

        return data

    except Exception as e:  # More specific than Error
        print(f"Database error: {str(e)}")
        return None

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

def get_all_interns():
    conn = get_connection()
    if not conn:
        return []
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT name, referral_code, donations, referrals, goal_completion FROM interns")
        data = cursor.fetchall()
        return data
    except Error as e:
        print(f"Query error: {e}")
        return []
    finally:
        cursor.close()
        conn.close()

def get_leaderboard():
    conn = get_connection()
    if not conn:
        return []
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT name, referral_code, donations FROM interns ORDER BY donations DESC LIMIT 5"
        )
        data = cursor.fetchall()
        return data
    except Error as e:
        print(f"Query error: {e}")
        return []
    finally:
        cursor.close()
        conn.close()

def get_avg_donation(referral_code):
    conn = get_connection()
    if not conn:
        return 0
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT AVG(donations) FROM interns WHERE referral_code = %s",
            (referral_code,)
        )
        result = cursor.fetchone()
        return float(result[0]) if result and result[0] is not None else 0
    except Error as e:
        print(f"Query error: {e}")
        return 0
    finally:
        cursor.close()
        conn.close()