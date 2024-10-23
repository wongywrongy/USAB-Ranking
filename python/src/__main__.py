# In databaseHandler.py
import os

from dbFunctions import insert_all_player_points, insert_final_player_rankings

# Corrected paths to your CSV files
file1_path = 'data/USAB Rankings Sep 2024.xlsx - August2024AllPlayerPoints.csv'
file2_path = 'data/USAB Rankings Sep 2024.xlsx - August2024FinalPlayer_rankings.csv'

print(os.path.exists(file1_path))  # Should return True if the file exists
print(os.path.exists(file2_path))  # Should return True if the file exists

# Call functions with corrected paths
insert_all_player_points(file1_path)
insert_final_player_rankings(file2_path)
