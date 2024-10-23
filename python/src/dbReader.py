import sqlite3
from collections import defaultdict

def print_player_data(player_id):
    """
    Connects to two SQLite databases to retrieve and print player data for a given PlayerID.
    The function fetches data from 'allPlayerData.db' and 'finalPlayerData.db', then formats
    the output to display player details, events, and tournaments in a sorted order.

    Parameters:
    player_id (int): The ID of the player whose data is to be retrieved.

    Returns:
    None
    """
    try:
        # Connect to the first SQLite database
        conn1 = sqlite3.connect('allPlayerData.db')
        cursor1 = conn1.cursor()

        # SQL query to select all relevant data from the single table in allPlayerData.db
        query1 = '''
        SELECT PlayerID, FirstName, LastName, "Event Name", "Age Category",
               "Finishing Position", "Finishing Position Points",
               "Tournament Type", "Tournament Name"
        FROM AllPlayerData
        WHERE PlayerID = ?
        '''

        # Execute the query with the specified player_id
        cursor1.execute(query1, (player_id,))
        
        # Fetch all results from the first database
        results1 = cursor1.fetchall()

        # Connect to the second SQLite database
        conn2 = sqlite3.connect('finalPlayerData.db')
        cursor2 = conn2.cursor()

        # SQL query to select all relevant data from the single table in finalPlayerData.db
        query2 = '''
        SELECT PlayerID, FirstName, LastName, "Event Name", 
               "Total Points", "Junior National Points", "Rank"
        FROM finalPlayerData
        WHERE PlayerID = ?
        '''

        # Execute the query with the specified player_id
        cursor2.execute(query2, (player_id,))
        
        # Fetch all results from the second database
        results2 = cursor2.fetchall()

        # Define an order for sorting age categories
        age_order = {"U19": 0, "U17": 1, "U15": 2, "U13": 3, "U11": 4}
        event_order = {"BS": 0, "BD": 1, "GS": 2, "GD": 3, "XD": 4}

        # Process and print results from both databases if any results are found
        if results1 or results2:
            if results1:
                first_name = results1[0][1]
                last_name = results1[0][2]
                age_category = results1[0][4]

                print(f"Player: {first_name}, {last_name}, {age_category}")

                tournaments = defaultdict(set)
                for row in results1:
                    event_name = row[3]
                    finishing_position = row[5]
                    finishing_points = row[6]
                    tournament_name = row[8]

                    entry = (event_name, finishing_position, finishing_points)
                    tournaments[tournament_name].add(entry)

            if results2:
                print("\nEvents:")
                # Sort events by age category using the predefined order
                sorted_events = sorted(results2, key=lambda x: age_order.get(x[3].split()[-1], 5))
                for row in sorted_events:
                    event_name_final = row[3]
                    total_points_final = row[4]
                    junior_national_points_final = row[5]
                    rank_final = row[6]

                    print(f"{event_name_final}, Total Points: {total_points_final}, "
                          f"Junior National Points: {junior_national_points_final}, Rank: {rank_final}")

            if tournaments:
                print("\nTournaments:")
                for tournament, details in tournaments.items():
                    
                    print(f"{tournament[len("Badminton USA Results "):]}:")
                    # Sort tournament events by age category using the predefined order
                    for detail in sorted(details, key=lambda x: age_order.get(x[0].split()[-1], 5)):
                        print(f"  {detail[0]}, Position: {detail[1]}, Points: {detail[2]}")

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

    finally:
        if conn1:
            conn1.close()
        if conn2:
            conn2.close()

# Example usage
# print_player_data(2441)