from src import routes
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.register_blueprint(routes.calendar_bp, url_prefix="/api/tournaments")
app.register_blueprint(routes.tournament_bp, url_prefix="/api/tournament")
app.register_blueprint(routes.ranking_bp, url_prefix="/api/ranking")
app.register_blueprint(routes.players_bp, url_prefix="/api/players")


@app.route("/")
def home():
    return "Hello!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
