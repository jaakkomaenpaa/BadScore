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
    player = response.get("results")
    add_flag_url_to_country(player.get("country_model"))

    return player


def transform_player_tournament_years(response: dict):
    results = response.get("results")
    cleaned_data = []

    for year_obj in results:
        year = year_obj.get("year")
        cleaned_data.append(year)

    return cleaned_data


def transform_player_tournaments(response: dict):

    results = response.get("results")
    cleaned_data = []

    for tournament in results:
        model = tournament.get("tournament_model")
        if not model:
            continue

        add_flag_url_to_country(model.get("country_model"))
        cleaned_data.append(tournament)

    return cleaned_data


def transform_player_tournament_matches(response: dict):
    results = response.get("results")

    for draw_id, matches in results.items():

        if isinstance(matches, dict):
            for match in matches.values():
                add_flag_url_to_country(match.get("t1p1country_model"))
                add_flag_url_to_country(match.get("t1p2country_model"))
                add_flag_url_to_country(match.get("t2p1country_model"))
                add_flag_url_to_country(match.get("t2p2country_model"))

        else:
            for match in matches:
                add_flag_url_to_country(match.get("t1p1country_model"))
                add_flag_url_to_country(match.get("t1p2country_model"))
                add_flag_url_to_country(match.get("t2p1country_model"))
                add_flag_url_to_country(match.get("t2p2country_model"))

    return results
