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


def transform_matches(response: List[Dict], limit: int, status: str):

    if status == "completed":
        # If limit is defined, return latest completed matches up to the limit
        completed_matches = list(
            filter(
                lambda match: match["matchStatus"] == "O"
                or match["matchStatus"] == "F",
                response,
            )
        )
        return completed_matches[-limit:]

    # Could be implemented in the future
    if status == "upcoming":
        pass

    if status == "live":
        live_matches = list(filter(lambda match: match["matchStatus"] == "P", response))
        return live_matches

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
    # key: player_id: str, value: {status: str, worldRank: int}
    entries = {}
    stage_to_use = None

    if len(response) == 1:
        key = next(iter(response))
        stage_to_use = response[key]

    else:
        for stage in response.values():
            name = stage.get("name")

            if is_qualification and name == "Qualifying":
                stage_to_use = stage
                break

            if not is_qualification and name == "Main Draw":
                stage_to_use = stage
                break

    if not stage_to_use:
        return entries

    for entry in stage_to_use.get("entries"):
        player1 = entry.get("player1")
        player2 = entry.get("player2", None)

        player_id = str(player1.get("id"))

        if player2 is not None:
            player1_gender = int(player1.get("gender_id") or 0)
            player2_gender = int(player2.get("gender_id") or 0)

            if player1_gender < player2_gender:
                player_id = str(player2.get("id"))

            # Compare last names to find out which player is displayed on top
            player1_last_name = player1.get("last_name", "")
            player2_last_name = player2.get("last_name", "")

            if player1_last_name < player2_last_name:
                player_id = str(player2.get("id"))
            elif player1_last_name == player2_last_name:

                player1_first_name = player1.get("first_name", "")
                player2_first_name = player2.get("first_name", "")

                if player1_first_name < player2_first_name:
                    player_id = str(player2.get("id"))

        status = entry.get("status")
        world_rank = entry.get("rank")

        data = {
            "status": status,
            "worldRank": world_rank,
        }

        entries[player_id] = data

    return entries
