from model import Predict
import random

from flask import Flask
from flask import request
app = Flask(__name__)

fingerprint = random.randrange(0, 1000000)

@app.route('/predict', methods=['POST'])
def predict():
    print(request.form)
    a = int(request.form['a'])
    b = int(request.form['b'])
    res = a + b

    return {
        'result': res,
        'fingerprint': fingerprint
    }

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')