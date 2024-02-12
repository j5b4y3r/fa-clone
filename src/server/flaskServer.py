import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print("loading data")
dataFile = json.load(open("./database/data.json", 'r'))
'''solidIcon = dataFile.solid
regIcon = dataFile.regular
lightIcon = dataFile.light
thinIcon = dataFile.thin
duoIcon = dataFile.duotone'''
print("finished")
def database():
    pass

@app.route('/api/data')
def get_data():

    data = [
        dataFile
    ]
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=8008)
