from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

@app.route("/predict-burn", methods=["POST"])
def burn_rate():

    data = request.json

    expenses = np.array(data["expenses"], dtype=float)
    cash = float(data["cash"])

    # create time index
    X = np.arange(len(expenses)).reshape(-1,1)
    y = expenses

    # train simple regression model
    model = LinearRegression()
    model.fit(X,y)

    # predict next 6 months expenses
    future_months = np.arange(len(expenses), len(expenses)+6).reshape(-1,1)
    predicted_expenses = model.predict(future_months)

    remaining_cash = []
    remaining = cash

    for exp in predicted_expenses:
        remaining -= exp
        remaining_cash.append(round(remaining,2))

    return jsonify({
        "predictedExpenses": predicted_expenses.tolist(),
        "cashRemaining": remaining_cash
    })


if __name__ == "__main__":
    app.run(port=5001)