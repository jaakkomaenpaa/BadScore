from typing import Dict, Any, List
from utils import bracket


def transform_draws(response: dict):
    cleaned_data: List[Dict[str, Any]] = []

    for draw in response.get("results", []):
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


def transform_bracket(response: dict):
    results = response.get("results", {})
    rounds = bracket.populate_rounds(results)
    winner_entries = bracket.populate_winner_entries(rounds)

    return {"rounds": rounds, "winners": winner_entries}
