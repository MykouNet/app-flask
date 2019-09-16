from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'database-projet'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = "Salut !!!"

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/users/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    idMatricule = request.get_json()['idMatricule']
    motDePasse = bcrypt.generate_password_hash(request.get_json()['motDePasse']).decode('utf-8')
    fonction =  request.get_json()['fonction']


    cur.execute("INSERT INTO utilisateurs (idMatricule,motDePasse,fonction) VALUES ('"+
        str(idMatricule) + "','" +
        str(motDePasse)  + "','" +
        str(fonction)  + "')")

    mysql.connection.commit()

    result = {
        "idMatricule": idMatricule,
        "motDePasse": motDePasse,
        "fonction": fonction
    }

    return jsonify({"result": result})

@app.route('/users/login', methods =['POST'])
def login():
    cur = mysql.connection.cursor()
    idMatricule = request.get_json()['idMatricule']
    motDePasse = request.get_json()['motDePasse']
    result = ""

    cur.execute("SELECT * FROM utilisateurs where idMatricule = '" + str(idMatricule) +"'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['motDePasse'], motDePasse):
        access_token = create_access_token(identity = {'idMatricule': rv['idMatricule']})
        result = jsonify({"token":access_token})
    else:
        result = jsonify

if __name__=='__main__':
    app.run(debug=True)



