from utils.country import add_flag_url_to_country


def transform_search_response(response: dict): 
    results = response.get("results")
    pagination = response.get("pagination")

    page_data = {
        "currentPage": pagination.get("current_page"),
        "lastPage": pagination.get("last_page"),
        "total": pagination.get("total"),
        "from": pagination.get("from"),
        "to": pagination.get("to"),
    }

    if len(results) == 0:
        return {"players": [], "page": page_data}

    for player in results:
        add_flag_url_to_country(player.get("country_model"))

    return {"players": results, "page": page_data}


def transform_player_response(response: dict):
    return response.get("results")


def transform_player_tournament_years(response: dict):
    results = response.get("results")
    cleaned_data = []

    for year_obj in results:
        year = year_obj.get("year")
        cleaned_data.append(year)

    return cleaned_data


def transform_player_tournaments(response: dict):
    return response.get("results")
