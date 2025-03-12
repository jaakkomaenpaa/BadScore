from src import routes
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import init_mail, limiter

app = Flask(__name__)


CORS(app)
init_mail(app)
limiter.init_app(app)


app.register_blueprint(routes.calendar_bp, url_prefix="/api/tournaments")
app.register_blueprint(routes.tournament_bp, url_prefix="/api/tournament")
app.register_blueprint(routes.ranking_bp, url_prefix="/api/ranking")
app.register_blueprint(routes.players_bp, url_prefix="/api/players")
app.register_blueprint(routes.contact_bp, url_prefix="/api/contact")


@app.route("/")
def home():
    return "Hello!"


@app.errorhandler(429)
def ratelimit_error(e):
    return jsonify({"error": "Too many requests. Please try again later."}), 429


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
