# In databaseHandler.py
import os

from dbFunctions import insert_all_player_points, insert_final_player_rankings
from dbReader import print_player_data

# Corrected paths to your CSV files
file1_path = 'python/data/USAB Rankings Oct 2024.xlsx - October2024AllPlayerPoints.csv'
file2_path = 'python/data/USAB Rankings Oct 2024.xlsx - October2024FinalPlayer_rankings.csv'

# print(os.path.exists(file1_path))  # Should return True if the file exists
# print(os.path.exists(file2_path))  # Should return True if the file exists

# Call functions with corrected paths
insert_all_player_points(file1_path)
insert_final_player_rankings(file2_path)

# playerID = input("Query player ID: ")

# Call the function to print player data
# print_player_data(playerID)