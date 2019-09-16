import uuid
from datetime import timedelta

from flask import Flask
from api import *
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={"/api/*": {"origins": "*"}})


app.secret_key = "Salut !!!"#uuid.uuid4()


app.register_blueprint(routesAPIREST)

@app.before_request
def before_request():
    print("Avant requête")
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=15) #default : 31 days

if __name__ == '__main__':
    app.run(debug=True)        