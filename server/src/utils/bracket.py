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
def add_previous_score(prev_match: Optional[Dict[str, Union[int, dict]]], team: dict):

    if not prev_match or "match" not in prev_match:
        return

    prev_match_data = prev_match["match"]
    prev_match_side = "home" if prev_match_data.get("winner") == 1 else "away"

    prev_match_opponent_key = "team2" if prev_match_side == "home" else "team1"
    prev_match_opponent_name = prev_match_data.get(prev_match_opponent_key).get(
        "teamName"
    )
    prev_match_opponent_is_bye = (
        prev_match_opponent_name and prev_match_opponent_name.lower() == "bye"
    )

    team["prevScore"] = prev_match_data.get("score", None)
    team["prevScoreStatus"] = prev_match_data.get("scoreStatus", None)
    team["prevScoreStatusValue"] = prev_match_data.get("scoreStatusValue", "")
    team["prevMatchSide"] = "home" if prev_match_data.get("winner") == 1 else "away"
    team["seed"] = (
        prev_match_data.get("team1seed")
        if prev_match_side == "home"
        else prev_match_data.get("team2seed")
    )
    team["prevOpponentIsBye"] = prev_match_opponent_is_bye
    team["matchIsLive"] = prev_match_data.get("matchStatus") == "P"


# Fetch player status from entry list
def add_status(player: dict, entries: dict):
    player_id = player["id"]

    entry = entries.get(player_id, None)

    if not entry:
        return

    status = entry.get("status", None)
    player["status"] = status


def add_rank(player: dict, entries: dict):
    player_id = player["id"]
    entry = entries.get(player_id, None)

    if not entry:
        return

    world_rank = entry.get("worldRank", None)
    player["worldRank"] = world_rank


def add_data(players: List, entries: dict):
    add_status(players[0], entries)
    bottom_player = players[1] if len(players) >= 2 else players[0]
    add_rank(bottom_player, entries)


# Extract the winning team from the final round
def populate_winner_entries(rounds: Rounds, entries: dict) -> List[dict]:
    if not rounds:
        return []

    last_round_index = max(rounds.keys())
    winner_entries = []

    for match_data in rounds[last_round_index]:
        match = match_data["match"]

        if not match["winner"]:
            winner_entries.append(empty_winner)
            continue

        # Deep copy to prevent modification of existing rounds
        winner = copy.deepcopy(
            match["team1"] if match["winner"] == 1 else match["team2"]
        )
        add_previous_score({"index": 0, "match": match}, winner)

        if entries is not None:
            add_data(winner["players"], entries)

        if (
            winner["prevScoreStatus"] == 0
            and len(winner["prevScore"]) == 0
            and not winner["prevOpponentIsBye"]
        ):
            winner_entries.append(empty_winner)
        else:
            winner_entries.append(winner)

    return winner_entries


# Organize bracket results into rounds
def populate_rounds(results: BracketResults, entries: dict) -> Rounds:
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

            add_previous_score(prev_match_home, match["team1"])
            add_previous_score(prev_match_away, match["team2"])

        if entries is not None:
            players_home = match.get("team1").get("players")
            players_away = match.get("team2").get("players")

            if len(players_home) > 0:
                add_data(players_home, entries)

            if len(players_away) > 0:
                add_data(players_away, entries)

        new_rounds[round_index].append({"index": match_index, "match": match})

    return new_rounds
