import routes
from flask import Flask

app = Flask(__name__)

app.register_blueprint(routes.tournaments_bp)
app.register_blueprint(routes.tournament_bp)


@app.route("/")
def home():
    return "Hello!"


if __name__ == "__main__":
    app.run(debug=True)
