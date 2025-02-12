import routes
from flask import Flask

app = Flask(__name__)

app.register_blueprint(routes.calendar_bp, url_prefix="/api/tournaments")
app.register_blueprint(routes.tournament_bp, url_prefix="/api/tournament")


@app.route("/")
def home():
    return "Hello!"


if __name__ == "__main__":
    app.run(debug=True)
