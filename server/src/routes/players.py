from flask import Blueprint, jsonify, request
from services import players

players_bp = Blueprint("players", __name__)


@players_bp.route("/search", methods=["GET"])
def search():
    search_key = request.args.get("search")

    if not search_key or len(search_key) < 3:
        return jsonify({"error": "Search key must have at least 3 characters"})

    page = request.args.get("page")
    if not page:
        page = 1

    try:
        page = int(page)
    except ValueError:
        page = 1

    data = players.search(search_key, page)
    return jsonify(data)


@players_bp.route("/<int:player_id>", methods=["GET"])
def get_player(player_id: int):
    data = players.get_player_by_id(player_id)
    return jsonify(data)


@players_bp.route("/<int:player_id>/bio", methods=["GET"])
def get_player_bio(player_id: int):
    data = players.get_player_bio(player_id)
    return jsonify(data)


@players_bp.route("/<int:player_id>/tmt-years", methods=["GET"])
def get_player_tournament_years(player_id: int):
    data = players.get_player_tournament_years(player_id)
    return jsonify(data)


@players_bp.route("/<int:player_id>/tournaments/<int:year>", methods=["GET"])
def get_player_tournaments(player_id: int, year: int):
    data = players.get_player_tournaments(player_id, year)
    return jsonify(data)
