from typing import Dict, Any, List
from utils import bracket


def transform_draws(response: dict):
    cleaned_data: List[Dict[str, Any]] = []

    draws = response.get("results")

    if not draws:
        return None

    for draw in draws:
        cleaned_data.append(
            {
                "isQualification": draw.get("qualification") == 1,
                "name": draw.get("text"),
                "type": draw.get("type"),
                "value": draw.get("value"),
            }
        )

    return cleaned_data


def transform_events(response: dict):
    return response.get("results")


def transform_event_stages(response: dict):
    return response.get("results")


def transform_players_staged(response: dict):
    return response.get("results")


def transform_matches(response: List[Dict], limit: int):
    if limit != 0:
        return response[-limit:]

    return response


def transform_bracket(response: dict, entry_list: dict = None):
    results = response.get("results", {})
    entries = None

    if entry_list is not None:
        is_qualification = (
            results.get("0-0").get("match").get("roundName").startswith("Qual")
        )

        entries = transform_entry_list(entry_list, is_qualification)

    rounds = bracket.populate_rounds(results, entries)
    winner_entries = bracket.populate_winner_entries(rounds, entries)

    return {"rounds": rounds, "winners": winner_entries}


def transform_standings(response: dict):
    return response.get("standings")


def transform_entry_list(response: dict, is_qualification: bool) -> dict:
    # key: player_id: str, value: status: str
    entries = {}
    stage_to_use = None

    for stage in response:
        name = response[stage].get("name")

        if is_qualification and name == "Qualifying":
            stage_to_use = response[stage]
            break

        if not is_qualification and name == "Main Draw":
            stage_to_use = response[stage]
            break

    if not stage_to_use:
        return entries

    for entry in stage_to_use.get("entries"):
        player_id = str(entry.get("player1").get("id"))
        status = entry.get("status")
        entries[player_id] = status

    return entries
