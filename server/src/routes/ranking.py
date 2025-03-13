from flask import Blueprint, jsonify, request
from services import ranking
from data import available_rankings

ranking_bp = Blueprint("ranking", __name__)


@ranking_bp.route("", methods=["GET"])
def get_rankings():
    return jsonify({"rankings": available_rankings})


@ranking_bp.route("/<int:ranking_id>", methods=["GET"])
def get_ranking_by_id(ranking_id: int):
    print("ranking_id", ranking_id)

    for ranking in available_rankings:
        if ranking["id"] == ranking_id:
            return jsonify(ranking)

    return jsonify({"error": "Ranking not found"})


@ranking_bp.route("/<int:ranking_id>/category/<int:category_id>", methods=["GET"])
def get_ranking_table(ranking_id: int, category_id: int):
    payload = request.args.to_dict()
    data = ranking.get_ranking_table(ranking_id, category_id, **payload)
    return jsonify(data)


@ranking_bp.route("/<int:ranking_id>/weeks", methods=["GET"])
def get_ranking_weeks(ranking_id: int):
    data = ranking.get_ranking_weeks(ranking_id)
    return jsonify(data)


@ranking_bp.route("/<int:ranking_id>/data", methods=["GET"])
def get_ranking_data(ranking_id: int):
    data = ranking.get_ranking_data(ranking_id)
    return jsonify(data)


@ranking_bp.route(
    "/<int:ranking_id>/category/<int:category_id>/breakdown",
    methods=["POST"],
)
def get_player_points_breakdown(ranking_id: int, category_id: int):
    req_data = request.get_json()
    entry = req_data.get("entry")

    data = ranking.get_player_points_breakdown(ranking_id, category_id, entry)
    return jsonify(data)


@ranking_bp.route(
    "/<int:ranking_id>/category/<int:category_id>/breakdown",
    methods=["GET"],
)
def test(ranking_id: int, category_id: int):
    data = ranking.get_player_points_breakdown(ranking_id, category_id)
    return jsonify(data)
