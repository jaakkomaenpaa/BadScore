from flask import Blueprint, jsonify, request
from services import calendar

calendar_bp = Blueprint("tournaments", __name__)


@calendar_bp.route("/", methods=["GET"])
def get_all():
    data = calendar.search()
    return jsonify(data)


@calendar_bp.route("/grades", methods=["GET"])
def get_categories_by_grade():
    # Dates are optional
    start_date = request.args.get("start")
    end_date = request.args.get("end")

    data = calendar.get_categories_by_grade(start_date, end_date)
    return jsonify(data)


@calendar_bp.route("/categories", methods=["GET"])
def get_categories():
    # Dates are optional
    start_date = request.args.get("start")
    end_date = request.args.get("end")

    data = calendar.get_categories(start_date, end_date)
    return jsonify(data)


@calendar_bp.route("/organizations", methods=["GET"])
def get_organizations():
    data = calendar.get_organizations()
    return jsonify(data)


@calendar_bp.route("/countries", methods=["GET"])
def get_countries():
    data = calendar.get_countries()
    return jsonify(data)


@calendar_bp.route("/search", methods=["GET"])
def search():
    categories = request.args.get("categories")
    payload = request.args.to_dict()
    payload["categories"] = categories.split(",") if categories else []

    data = calendar.search(**payload)
    return jsonify(data)
