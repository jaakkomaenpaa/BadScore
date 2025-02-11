from flask import Blueprint, jsonify, request
from services import tournaments

tournaments_bp = Blueprint("tournaments", __name__, url_prefix="/tournaments")


@tournaments_bp.route("/", methods=["GET"])
def get_all():
    data = tournaments.search()
    return jsonify(data)


@tournaments_bp.route("/categories", methods=["GET"])
def get_categories():
    data = tournaments.get_categories()
    return jsonify(data)


@tournaments_bp.route("/organizations", methods=["GET"])
def get_organizations():
    data = tournaments.get_organizations()
    return jsonify(data)


@tournaments_bp.route("/countries", methods=["GET"])
def get_countries():
    print("Request", request)
    data = tournaments.get_countries()
    return jsonify(data)


@tournaments_bp.route("/search", methods=["GET"])
def search():
    payload = request.args.to_dict()
    data = tournaments.search(**payload)
    return jsonify(data)


