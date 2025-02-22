import sqlite3
from contextlib import closing


def connect():
    return sqlite3.connect("tournaments.db")


def create_tournament_table():
    with connect() as conn, closing(conn.cursor()) as cursor:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS tournaments (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                start_date TEXT
            );
            """
        )
        conn.commit()


def insert_tournament(id: int, name: str, start_date: str):
    with connect() as conn, closing(conn.cursor()) as cursor:
        cursor.execute(
            """
            INSERT OR IGNORE INTO tournaments (id, name, start_date)
            VALUES (?, ?, ?);
            """,
            (id, name, start_date),
        )
        conn.commit()
        if cursor.rowcount == 0:
            return {
                "success": False,
                "message": f"Tournament with ID {id} already exists",
            }
        return {"success": True, "message": f"{name} added successfully"}


def get_tournament_info_by_id(id: int):
    with connect() as conn, closing(conn.cursor()) as cursor:
        cursor.execute(
            """
            SELECT name, start_date FROM tournaments WHERE id = ?;
            """,
            (id,),
        )
        result = cursor.fetchone()
        return (
            {"id": id, "name": result[0], "start_date": result[1]} if result else None
        )
