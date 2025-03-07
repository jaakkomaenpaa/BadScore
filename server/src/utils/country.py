from config import FLAG_URL
from typing import Dict, Any


def add_flag_url_to_country(country: Dict[str, Any]):
    if not country:
        return country

    flag_name = country.get("flag_name_svg")
    country["flag_url_svg"] = FLAG_URL + flag_name
    return country
