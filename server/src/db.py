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
                name TEXT NOT NULL
            );
            """
        )
        conn.commit()


def insert_tournament(id: int, name: str):
    with connect() as conn, closing(conn.cursor()) as cursor:
        cursor.execute(
            """
            INSERT OR IGNORE INTO tournaments (id, name)
            VALUES (?, ?);
            """,
            (id, name),
        )
        conn.commit()
        if cursor.rowcount == 0:
            return {
                "success": False,
                "message": f"Tournament with ID {id} already exists",
            }
        return {"success": True, "message": f"{name} added successfully"}


def get_tournament_name_by_id(id: int):
    with connect() as conn, closing(conn.cursor()) as cursor:
        cursor.execute(
            """
            SELECT name FROM tournaments WHERE id = ?;
            """,
            (id,),
        )
        result = cursor.fetchone()
        return {"id": id, "name": result[0]} if result else None
