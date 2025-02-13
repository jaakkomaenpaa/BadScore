from curl_cffi import requests
from config import AUTH_TOKEN, API_URL, CURRENT_YEAR
from transformers import calendar
from typing import List

headers = {"authorization": AUTH_TOKEN}


def search(
    search: str = "",
    country: str = "",
    start: str = f"{CURRENT_YEAR}-01-01",
    end: str = f"{CURRENT_YEAR}-12-31",
    per_page: int = 20,
    page: int = 1,
    organization: int = 0,
    categories: List[int] = [],
):
    url = f"{API_URL}/vue-tournaments-search"

    payload = {
        "activeTab": 5,
        "drawCount": 0,
        "endDate": end,
        "page": page,
        "perPage": per_page,
        "searchText": search,
        "startDate": start,
        "country": country,
        "organization": organization,
        "category": categories,
    }

    response = requests.post(url, headers=headers, json=payload, impersonate="chrome")
    return calendar.transform_search_response(response.json())


def get_categories(
    start_date: str = f"{CURRENT_YEAR}-01-01",
    end_date: str = f"{CURRENT_YEAR}-12-31",
):
    url = f"{API_URL}/vue-tournament-categories"

    response = requests.get(url, headers=headers, impersonate="chrome")
    return calendar.transform_categories(response.json())


def get_categories_by_grade(
    start_date: str = f"{CURRENT_YEAR}-01-01",
    end_date: str = f"{CURRENT_YEAR}-12-31",
):
    url = f"{API_URL}/vue-tournament-categories"

    response = requests.get(url, headers=headers, impersonate="chrome")
    return calendar.transform_categories_by_grade(response.json())


def get_organizations():
    url = f"{API_URL}/vue-tournament-organizations"

    response = requests.get(url, headers=headers, impersonate="chrome")
    return response.json()


def get_countries():
    url = f"{API_URL}/vue-countries"

    response = requests.get(url, headers=headers, impersonate="chrome")
    return response.json()
