from services import calendar
from db import insert_tournament, create_tournament_table


def get_and_save_tournament_names_and_ids():
    pages = 43

    for page in range(1, pages + 1):
        try:
            response = calendar.search(page=page, per_page=100)
            tournaments = response.get("results", [])
        except Exception as e:
            print(f"Error fetching page {page}: {e}")
            continue

        if not tournaments:
            print(f"No tournaments found on page {page}. Skipping.")
            continue

        for tournament in tournaments:
            tourn_id = tournament["id"]
            name = tournament["name"]
            start_date = tournament["startDate"].split(" ")[0]

            result = insert_tournament(tourn_id, name, start_date)
            print(result["message"])


create_tournament_table()
get_and_save_tournament_names_and_ids()
