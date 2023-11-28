from flask import Flask, request, jsonify
import traceback
import pyrebase

app = Flask(__name__)
app.secret_key = 'secret'

firebaseConfig = {
    'apiKey': "AIzaSyC80Bp9567TXIin-N_qprSljs0nOJj7VYw",
    'authDomain': "smart-home-app-4d43d.firebaseapp.com",
    'projectId': "smart-home-app-4d43d",
    'storageBucket': "smart-home-app-4d43d.appspot.com",
    'messagingSenderId': "253103456135",
    'appId': "1:253103456135:web:4b8b39b5e16b058f6b1d22",
    'databaseURL': ""
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()  # Retrieve the JSON data from the request

    # Access the specific fields in the data
    email = data.get('email')
    password = data.get('password')
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return jsonify({'success': True}) # Return a JSON response indicating success
    except Exception as e:
        error_message = str(e) 
        return jsonify({'success': False, 'error': error_message})


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()  # Retrieve the JSON data from the request

    # Access the specific fields in the data
    email = data.get('email')
    password = data.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify({'success': True}) # Return a JSON response indicating success
    except Exception as e:
        error_message = str(e) 
        return jsonify({'success': False, 'error': error_message})

if __name__ == "__main__":
    app.run(host='192.168.8.100', port=3000, debug=True)