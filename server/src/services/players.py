from curl_cffi import requests
from config import AUTH_TOKEN, API_URL, CURRENT_YEAR
from transformers import players
from typing import List

headers = {"authorization": AUTH_TOKEN}


def search(search_key: str, page: int = 1):
    url = f"{API_URL}/vue-popular-players"

    payload = {"page": page, "searchKey": search_key, "activeTab": 1}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return players.transform_search_response(response.json())


def get_player_bio(id: int):
    url = f"{API_URL}/vue-player-bio"

    payload = {"activeTab": 1, "playerId": str(id)}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")

    if response.status_code != 200:
        return {"error": "Bio not found"}

    return response.json()


def get_player_by_id(id: int, is_para: bool = False):
    url = f"{API_URL}/vue-player-summary"

    payload = {"isPara": is_para, "playerId": str(id)}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return players.transform_player_response(response.json())


def get_player_tournament_years(id: int, is_para: bool = False, locale: str = "en"):
    url = f"{API_URL}/vue-player-tmt-years"

    payload = {
        "isPara": is_para,
        "playerId": str(id),
        "extranetUrl": "https://extranet.bwf.sport",
        "activeTab": 2,
        "locale": locale,
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return players.transform_player_tournament_years(response.json())


def get_player_tournaments(
    id: int, year: int, is_para: bool = False, locale: str = "en"
):
    url = f"{API_URL}/vue-player-tournaments"

    payload = {
        "isPara": is_para,
        "playerId": str(id),
        "extranetUrl": "https://extranet.bwf.sport",
        "activeTab": 2,
        "locale": locale,
        "tmtYear": year,
        "searchKey": "",
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return players.transform_player_tournaments(response.json())


def get_player_tournament_matches(
    player_id: int, tournament_id: int, event_ids: List[int], tmt_type: int
):
    url = f"{API_URL}/vue-player-tmt-matches"

    data = {}

    for event_id in event_ids:
        payload = {
            "playerId": player_id,
            "tmtId": str(tournament_id),
            "eventId": str(event_id),
            "activeTab": 2,
            "extranetUrl": "https://extranet.bwf.sport",
            "locale": "en",
            "tmtType": str(tmt_type),
        }

        response = requests.post(
            url, headers=headers, json=payload, impersonate="chrome"
        )

        data[event_id] = players.transform_player_tournament_matches(response.json())

    return data
