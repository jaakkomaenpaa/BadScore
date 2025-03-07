from typing import Dict, Any, List
from utils.country import add_flag_url_to_country


def transform_ranking_table_response(response: dict):
    cleaned_data: List[Dict[str, Any]] = []
    results = response.get("results")

    for ranking_entry in results.get("data"):
        player1 = ranking_entry.get("player1_model")
        player2 = ranking_entry.get("player2_model")
        team = ranking_entry.get("team_model")

        if player1 is not None:
            add_flag_url_to_country(player1.get("country_model"))

        if player2 is not None:
            add_flag_url_to_country(player2.get("country_model"))

        if team is not None:
            add_flag_url_to_country(team.get("country_model"))

        cleaned_data.append(ranking_entry)

    results_from = results.get("from")
    results_to = results.get("to")

    on_this_page = 0
    if results_from and results_to:
        on_this_page = results_to - results_from + 1

    return {
        "lastPage": results.get("last_page"),
        "currentPage": results.get("current_page"),
        "total": results.get("total"),
        "entries": cleaned_data,
        "onThisPage": on_this_page,
    }


def transform_ranking_data_response(response: dict):
    return response[0]
