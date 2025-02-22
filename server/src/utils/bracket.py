import copy
from typing import Dict, List, Optional, Union

Rounds = Dict[int, List[Dict[str, Union[int, dict]]]]
BracketResults = Dict[str, Dict[str, Union[int, str, List[dict]]]]

empty_winner = {
    "countryCode": None,
    "countryFlagUrl": None,
    "linkName": "",
    "players": [],
    "teamId": None,
    "teamName": "",
}


# Sets previous match score and status for a team.
def get_previous_score(prev_match: Optional[Dict[str, Union[int, dict]]], team: dict):

    if prev_match and "match" in prev_match:
        prev_match_data = prev_match["match"]
        team["prevScore"] = prev_match_data.get("score", None)
        team["prevScoreStatus"] = prev_match_data.get("scoreStatus", None)
        team["prevScoreStatusValue"] = prev_match_data.get("scoreStatusValue", "")
        team["prevMatchSide"] = "home" if prev_match_data.get("winner") == 1 else "away"


# Extract the winning team from the final round
def populate_winner_entries(rounds: Rounds) -> List[dict]:
    if not rounds:
        return []

    last_round_index = max(rounds.keys())
    winner_entries = []

    for match_data in rounds[last_round_index]:
        match = match_data["match"]
        if "winner" not in match:
            continue

        # Deep copy to prevent modification of existing rounds
        winner = copy.deepcopy(
            match["team1"] if match["winner"] == 1 else match["team2"]
        )
        get_previous_score({"index": 0, "match": match}, winner)

        if winner["prevScoreStatus"] == 0 and len(winner["prevScore"]) == 0:
            winner_entries.append(empty_winner)
        else:
            winner_entries.append(winner)

    return winner_entries


# Organize bracket results into rounds
def populate_rounds(results: BracketResults) -> Rounds:
    new_rounds: Rounds = {}

    sorted_results = sorted(
        results.items(), key=lambda x: list(map(int, x[0].split("-")))
    )

    for key, match_data in sorted_results:
        match = match_data.get("match")
        if not match:
            continue

        round_index, match_index = map(int, key.split("-"))
        if round_index not in new_rounds:
            new_rounds[round_index] = []

        if round_index > 0:
            prev_round = new_rounds.get(round_index - 1, [])

            prev_match_home = (
                prev_round[match_index * 2]
                if len(prev_round) > match_index * 2
                else None
            )
            prev_match_away = (
                prev_round[match_index * 2 + 1]
                if len(prev_round) > match_index * 2 + 1
                else None
            )

            get_previous_score(prev_match_home, match["team1"])
            get_previous_score(prev_match_away, match["team2"])

        new_rounds[round_index].append({"index": match_index, "match": match})

    return new_rounds
