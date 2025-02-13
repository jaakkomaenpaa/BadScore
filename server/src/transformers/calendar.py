from typing import Dict, Any, List


def transform_search_response(response: dict):
    cleaned_data: List[Dict[str, Any]] = []

    for tournament in response.get("results", {}).get("data", []):
        cleaned_data.append(
            {
                "category": tournament.get("category"),
                "code": tournament.get("code"),
                "country": tournament.get("country"),
                "dates": tournament.get("date"),
                "endDate": tournament.get("end_date"),
                "flagUrl": tournament.get("flag_url"),
                "hasLiveScores": tournament.get("has_live_scores"),
                "headerUrl": tournament.get("header_url"),
                "headerUrlMobile": tournament.get("header_url_mobile"),
                "id": tournament.get("id"),
                "liveStatus": tournament.get("live_status"),
                "location": tournament.get("location"),
                "logoUrl": tournament.get("logo"),
                "name": tournament.get("name"),
                "prizeMoney": tournament.get("prize_money"),
                "startDate": tournament.get("start_date"),
            }
        )

    return {
        "resultsLength": len(cleaned_data),
        "results": cleaned_data,
    }


def transform_categories_by_grade(response: dict):
    cleaned_data: List[Dict[str, Any]] = []

    for grade in response.get("data", []):
        cleaned_categories: List[Dict[str, any]] = []

        for category in grade.get("categories"):
            cleaned_categories.append(
                {
                    "grade": category.get("grade"),
                    "id": category.get("id"),
                    "isJunior": bool(category.get("junior", 0)),
                    "level": category.get("level"),
                    "name": category.get("name"),
                    "isPara": bool(category.get("para", 0)),
                }
            )

        cleaned_data.append(
            {
                "label": grade.get("label"),
                "name": grade.get("name"),
                "categories": cleaned_categories,
            }
        )

    return {
        "results": cleaned_data,
    }


def transform_categories(response: dict):
    cleaned_data: List[Dict[str, Any]] = []

    for grade in response.get("data", []):
        for category in grade.get("categories"):
            cleaned_data.append(
                {
                    "grade": category.get("grade"),
                    "id": category.get("id"),
                    "isJunior": bool(category.get("junior", 0)),
                    "level": category.get("level"),
                    "name": category.get("name"),
                    "isPara": bool(category.get("para", 0)),
                }
            )

    return {
        "results": cleaned_data,
    }
