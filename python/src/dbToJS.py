import sqlite3
import json
from datetime import datetime

def export_db_to_js(db_path, table_name, js_file_path):
    """
    Exports data from an SQLite database table to a JavaScript file as a constant.
    Includes the current date in the output file.

    Parameters:
    db_path (str): Path to the SQLite database file.
    table_name (str): Name of the table to export data from.
    js_file_path (str): Path where the JavaScript file will be saved.

    Returns:
    None
    """
    try:
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

        # Convert data to JSON format
        json_data = json.dumps(data, indent=4)

        # Get current date
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Wrap JSON data in a JS export statement with a date comment
        js_content = f"// Data exported on {current_date}\nconst playerData = {json_data};\n\nexport default playerData;"

        # Write JS content to file
        with open(js_file_path, 'w') as js_file:
            js_file.write(js_content)

        print(f"Successfully exported data from {table_name} in {db_path} to {js_file_path}")

    except sqlite3.Error as e:
        print(f"An error occurred while accessing {db_path}: {e}")
    except Exception as e:
        print(f"An error occurred while writing to {js_file_path}: {e}")
    finally:
        if conn:
            conn.close()

# Example usage
export_db_to_js('allPlayerData.db', 'AllPlayerData', 'src/data/allPlayerData.js')
export_db_to_js('finalPlayerData.db', 'finalPlayerData', 'src/data/finalPlayerData.js')