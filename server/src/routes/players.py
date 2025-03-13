from flask import Blueprint, jsonify, request
from services import players
from db import get_tournament_info_by_id

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


@players_bp.route("/<int:player_id>/tournaments/year/<int:year>", methods=["GET"])
def get_player_tournaments(player_id: int, year: int):
    data = players.get_player_tournaments(player_id, year)
    return jsonify(data)


@players_bp.route("/<int:player_id>/tournaments/<int:tournament_id>", methods=["GET"])
def get_player_tournament_by_id(player_id: int, tournament_id: int):
    tournament = get_tournament_info_by_id(tournament_id)

    start_date = tournament["start_date"] if tournament else None
    year = start_date.split("-")[0]

    data = players.get_player_tournaments(player_id, year)

    result = next(
        (item for item in data if item.get("tournament_id") == tournament_id), None
    )

    return jsonify(result)


@players_bp.route("/<int:player_id>/tournaments/<int:tournament_id>", methods=["POST"])
def get_player_tournament_matches(player_id: int, tournament_id: int):
    req_data = request.get_json()
    event_ids = req_data.get("eventIds")
    tmt_type = req_data.get("tmtType")

    if not event_ids:
        return jsonify({"error": "Event IDs are required"})

    if len(event_ids) == 0:
        return jsonify([])

    if not tmt_type and tmt_type != 0:
        return jsonify({"error": "Tournament type is required"})

    data = players.get_player_tournament_matches(
        player_id, tournament_id, event_ids, tmt_type
    )
    return jsonify(data)


@players_bp.route(
    "/<int:player_id>/tournaments/<int:tournament_id>/event/<int:event_id>/type/<int:tmt_type>",
    methods=["GET"],
)
def test(player_id: int, tournament_id: int, event_id: int, tmt_type: int):

    data = players.get_player_tournament_matches(
        player_id, tournament_id, [event_id], tmt_type
    )
    return jsonify(data)
