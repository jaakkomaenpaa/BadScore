def transform_events(response: dict):
    return response.get("results")


def transform_event_stages(response: dict):
    return response.get("results")


def transform_players_staged(response: dict):
    return response.get("results")
