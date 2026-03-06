from flask import Flask, request, jsonify
import numpy as np
from transformers import pipeline

app = Flask(__name__)

# HuggingFace time series forecasting pipeline
forecaster = pipeline(
    "time-series-forecasting",
    model="huggingface/time-series-transformer-tourism-monthly"
)

@app.route("/predict-burn", methods=["POST"])
def burn_rate():

    data = request.json
    expenses = np.array(data["expenses"], dtype=float)
    cash = float(data["cash"])

    # Forecast next 6 months expenses
    forecast = forecaster(expenses.tolist(), prediction_length=6)

    predicted_expenses = forecast[0]["mean"]

    remaining_cash = []
    remaining = cash

    for exp in predicted_expenses:
        remaining -= exp
        remaining_cash.append(round(remaining, 2))

    return jsonify({
        "cashRemaining": remaining_cash
    })


if __name__ == "__main__":
    app.run(port=5001)