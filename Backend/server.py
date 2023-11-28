from flask import Flask, request, jsonify

import pyrebase

app = Flask(__name__)
app.secret_key = 'secret'

firebaseConfig = {
    'apiKey': "AIzaSyC80Bp9567TXIin-N_qprSljs0nOJj7VYw",
    'authDomain': "smart-home-app-4d43d.firebaseapp.com",
    'projectId': "smart-home-app-4d43d",
    'storageBucket': "smart-home-app-4d43d.appspot.com",
    'messagingSenderId': "253103456135",
    'appId': "1:253103456135:web:4b8b39b5e16b058f6b1d22"
}

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()  # Retrieve the JSON data from the request

    # Access the specific fields in the data
    username = data.get('firstName')
    print(username)

    mem = {"members": ["member1", "member2", "member3"]}
    return jsonify(mem)

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()  # Retrieve the JSON data from the request

    # Access the specific fields in the data
    email = data.get('email')
    print(email)

    return jsonify({"members": ["member1", "member2", "member3"]})

if __name__ == "__main__":
    app.run(host='192.168.190.243', port=3000, debug=True)