from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


app = Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.get_json()

    budget = data.get("budget")
    experience = data.get("experience")
    bike_type = data.get("bikeType")
    goal = data.get("goal")

    prompt = f"""
You are WheelRank AI.

Recommend ONE bike for this rider.

Budget:
{budget}

Experience:
{experience}

Bike Type:
{bike_type}

Goal:
{goal}

Return ONLY valid JSON.

Example:

{{
"bike":"Surron Light Bee X",
"score":"97/100",
"reasons":[
"Great balance",
"Reliable",
"Easy upgrades",
"Excellent value"
]
}}
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    text = response.output_text.strip()

    import json

    ai = json.loads(text)

    return jsonify(ai)