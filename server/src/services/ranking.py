from curl_cffi import requests
from config import AUTH_TOKEN, API_URL
from transformers import ranking

headers = {"authorization": AUTH_TOKEN}


# Return available ranking weeks
def get_ranking_weeks(ranking_id: int):
    url = f"{API_URL}/vue-rankingweek"

    # rankId is the type of ranking: 2 = BWF World ranking
    payload = {"rankId": ranking_id}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return response.json()


# Week id is 0 for the latest ranking
def get_ranking_table(
    ranking_id: int,
    category_id,
    is_doubles: bool = False,
    week: int = 0,
    page: int = 1,
    per_page: int = 10,
):
    url = f"{API_URL}/vue-rankingtable"

    payload = {
        "rankId": ranking_id,
        "catId": category_id,
        "doubles": is_doubles,
        "drawCount": 1,
        "page": page,
        "pageKey": str(per_page),
        "publicationId": week,
        "searchKey": "",
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return ranking.transform_ranking_table_response(response.json())


# Basically only used to get the latest update
def get_ranking_data(ranking_id: int):
    url = f"{API_URL}/vue-rankingdata"

    payload = {"rankId": ranking_id}

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return ranking.transform_ranking_data_response(response.json())
