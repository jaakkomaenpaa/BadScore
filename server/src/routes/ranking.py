from flask import Blueprint, jsonify, request
from services import ranking
from data import available_rankings

ranking_bp = Blueprint("ranking", __name__)


@ranking_bp.route("/", methods=["GET"])
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
    """
    week_id = request.args.get("week")
    is_doubles = request.args.get("doubles")
    page = request.args.get("page")

    if not week_id or not int(week_id):
        week_id = 0

    if not is_doubles or int(is_doubles) != 1:
        is_doubles = False

    if not page or not int(page):
        page = 1
    """
    data = ranking.get_ranking_table(
        ranking_id, category_id, **payload
    )  # is_doubles, week_id, page)
    return jsonify(data)


@ranking_bp.route("/<int:ranking_id>/weeks", methods=["GET"])
def get_ranking_weeks(ranking_id: int):
    data = ranking.get_ranking_weeks(ranking_id)
    return jsonify(data)


@ranking_bp.route("/<int:ranking_id>/data", methods=["GET"])
def get_ranking_data(ranking_id: int):
    data = ranking.get_ranking_data(ranking_id)
    return jsonify(data)
