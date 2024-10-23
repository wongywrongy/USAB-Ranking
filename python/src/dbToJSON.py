import sqlite3
import json
import os
from datetime import datetime

def export_to_json(db_path, table_name, output_dir='data'):
    """
    Exports data from a specified SQLite database table to a JSON file.
    The JSON file is named with the current date and saved in the specified directory.

    Parameters:
    db_path (str): The path to the SQLite database file.
    table_name (str): The name of the table to export data from.
    output_dir (str): The directory where the JSON file will be saved.

    Returns:
    None
    """
    conn = None
    try:
        # Ensure the output directory exists
        os.makedirs(output_dir, exist_ok=True)

        # Construct the JSON file path with the current date
        current_date = datetime.now().strftime('%Y-%m-%d')
        json_filename = f"{table_name}_{current_date}.json"
        json_path = os.path.join(output_dir, json_filename)

        # Connect to the SQLite database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Query all data from the specified table
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()

        # Get column names from the cursor description
        column_names = [description[0] for description in cursor.description]

        # Convert rows to a list of dictionaries
        data = [dict(zip(column_names, row)) for row in rows]

        # Write data to a JSON file
        with open(json_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)

        print(f"Exported data from {db_path} (table: {table_name}) to {json_path}")

    except sqlite3.Error as e:
        print(f"An error occurred while accessing {db_path}: {e}")
    except OSError as e:
        print(f"Failed to create directory or write to file: {e}")
    except Exception as e:
        print(f"An error occurred during processing: {e}")
    finally:
        if conn:
            conn.close()

# Example usage
export_to_json('allPlayerData.db', 'AllPlayerData', 'python/data')
export_to_json('finalPlayerData.db', 'finalPlayerData', 'python/data')