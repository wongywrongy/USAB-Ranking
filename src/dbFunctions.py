import pandas as pd
import sqlite3
import os

def insert_all_player_points(relative_file_path):
    """
    Reads player points data from a CSV file and inserts it into the 'AllPlayerData' table
    in the 'allPlayerData.db' SQLite database. This function consolidates relevant columns
    into a single table for easier data management.

    Parameters:
    relative_file_path (str): The relative path to the CSV file containing player points data.

    Returns:
    None
    """
    # Construct the full file path from the current working directory
    file_path = os.path.join(os.getcwd(), relative_file_path)

    # Read data from CSV file
    df = pd.read_csv(file_path)

    # Connect to SQLite database
    conn = sqlite3.connect('allPlayerData.db')

    # Combine necessary columns into one DataFrame, ensuring no duplicates
    combined_data = df[['PlayerID', 'Event Name', 'Age Category', 'Finishing Position',
                        'Finishing Position Points', 'Tournament Type', 'Tournament Name',
                        'FirstName', 'LastName']].drop_duplicates()

    # Insert combined data into a single table named 'AllPlayerData'
    combined_data.to_sql('AllPlayerData', conn, if_exists='replace', index=False)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

def insert_final_player_rankings(relative_file_path):
    """
    Reads final player rankings from a CSV file and inserts it into the 'finalPlayerData' table
    in the 'finalPlayerData.db' SQLite database. This function consolidates relevant columns
    into a single table for easier data management.

    Parameters:
    relative_file_path (str): The relative path to the CSV file containing final player rankings.

    Returns:
    None
    """
    # Construct the full file path from the current working directory
    file_path = os.path.join(os.getcwd(), relative_file_path)

    # Read data from CSV file
    df = pd.read_csv(file_path)

    # Connect to SQLite database
    conn = sqlite3.connect('finalPlayerData.db')

    # Combine necessary columns into one DataFrame, ensuring no duplicates
    combined_data = df[['PlayerID', 'Event Name', 'FirstName', 'LastName',
                        'Total Points', 'Junior National Points', 'Rank']].drop_duplicates()

    # Insert combined data into a single table named 'finalPlayerData'
    combined_data.to_sql('finalPlayerData', conn, if_exists='replace', index=False)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

# Example usage (adjust paths as necessary):
# insert_all_player_points('path/to/your/all_player_points.csv')
# insert_final_player_rankings('path/to/your/final_player_rankings.csv')