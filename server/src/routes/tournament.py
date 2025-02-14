from flask import Blueprint, jsonify, request
from services import tournament, calendar
from db import get_tournament_name_by_id

tournament_bp = Blueprint("tournament", __name__)


@tournament_bp.route("/<int:tournament_id>", methods=["GET"])
def get_by_id(tournament_id: int):
    tournament = get_tournament_name_by_id(tournament_id)
    name = tournament["name"] if tournament else None

    if not name:
        return jsonify({"error": "Tournament not found"})

    data = calendar.search(search=name)
    return jsonify({"result": data})


@tournament_bp.route("/<int:tournament_id>/draws", methods=["GET"])
def get_draws(tournament_id: int):
    data = tournament.get_draws(tournament_id)
    return jsonify({"draws": data})


@tournament_bp.route("/<int:tournament_id>/events", methods=["GET"])
def get_events(tournament_id: int):
    data = tournament.get_events(tournament_id)
    return jsonify({"events": data})


@tournament_bp.route("/<int:tournament_id>/events/<event_id>/stages", methods=["GET"])
def get_event_stages(tournament_id: int, event_id: str):
    data = tournament.get_event_stages(tournament_id, event_id)
    return jsonify({"event_stages": data})


@tournament_bp.route("/<int:tournament_id>/bracket", methods=["GET"])
def get_bracket(tournament_id: int):
    draw_id = request.args.get("draw")
    data = tournament.get_bracket(tournament_id, draw_id)
    return jsonify({"bracket": data})


@tournament_bp.route("/<tournament_code>/courts", methods=["GET"])
def get_courts(tournament_code: str):
    date = request.args.get("date")
    data = tournament.get_courts(tournament_code, date)
    return jsonify({"courts": data})


@tournament_bp.route("/<tournament_code>/matches", methods=["GET"])
def get_matches(tournament_code: str):
    date = request.args.get("date")
    data = tournament.get_matches(tournament_code, date)
    return jsonify({"matches": data})


@tournament_bp.route("/<int:tournament_id>/events/<event_id>/players", methods=["GET"])
def get_players_staged(tournament_id: int, event_id: str):
    data = tournament.get_players_staged(tournament_id, event_id)
    return jsonify({"players": data})
