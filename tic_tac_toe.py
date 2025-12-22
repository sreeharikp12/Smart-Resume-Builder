def print_board(board):
    """Display the tic-tac-toe board."""
    print("\n" + "=" * 13)
    for i in range(3):
        print(f"| {board[i][0]} | {board[i][1]} | {board[i][2]} |")
        if i < 2:
            print("-" * 13)
    print("=" * 13 + "\n")


def initialize_board():
    """Create an empty 3x3 board."""
    return [['1', '2', '3'], 
            ['4', '5', '6'], 
            ['7', '8', '9']]


def check_winner(board):
    """Check if there's a winner and return the winner's symbol, or None."""
    # Check rows
    for row in board:
        if row[0] == row[1] == row[2]:
            return row[0]
    
    # Check columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col]:
            return board[0][col]
    
    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2]:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0]:
        return board[0][2]
    
    return None


def is_board_full(board):
    """Check if the board is full (no more moves available)."""
    for row in board:
        for cell in row:
            if cell not in ['X', 'O']:
                return False
    return True


def get_move(board, player):
    """Get a valid move from the player."""
    while True:
        try:
            position = input(f"Player {player}, enter your move (1-9): ").strip()
            
            if not position.isdigit():
                print("Invalid input! Please enter a number between 1 and 9.")
                continue
            
            position = int(position)
            
            if position < 1 or position > 9:
                print("Invalid move! Please enter a number between 1 and 9.")
                continue
            
            # Convert position (1-9) to row and column
            row = (position - 1) // 3
            col = (position - 1) % 3
            
            # Check if the position is already taken
            if board[row][col] in ['X', 'O']:
                print("That position is already taken! Please choose another.")
                continue
            
            return row, col
            
        except ValueError:
            print("Invalid input! Please enter a number between 1 and 9.")
        except KeyboardInterrupt:
            print("\n\nGame interrupted. Goodbye!")
            exit()


def play_game():
    """Main game loop."""
    board = initialize_board()
    current_player = 'X'
    
    print("=" * 50)
    print("Welcome to Tic-Tac-Toe!")
    print("=" * 50)
    print("\nHow to play:")
    print("- Players take turns entering numbers 1-9")
    print("- The number corresponds to a position on the board:")
    print("  1 | 2 | 3")
    print("  ---------")
    print("  4 | 5 | 6")
    print("  ---------")
    print("  7 | 8 | 9")
    print("\nLet's begin!")
    
    while True:
        print_board(board)
        
        # Get player's move
        row, col = get_move(board, current_player)
        
        # Make the move
        board[row][col] = current_player
        
        # Check for winner
        winner = check_winner(board)
        if winner:
            print_board(board)
            print(f"🎉 Congratulations! Player {winner} wins! 🎉")
            break
        
        # Check for tie
        if is_board_full(board):
            print_board(board)
            print("It's a tie! Well played both players!")
            break
        
        # Switch players
        current_player = 'O' if current_player == 'X' else 'X'


def main():
    """Main function to run the game."""
    while True:
        play_game()
        
        # Ask if players want to play again
        while True:
            play_again = input("\nDo you want to play again? (yes/no): ").strip().lower()
            if play_again in ['yes', 'y']:
                print("\n" + "=" * 50 + "\n")
                break
            elif play_again in ['no', 'n']:
                print("\nThanks for playing! Goodbye! 👋")
                return
            else:
                print("Please enter 'yes' or 'no'.")


if __name__ == "__main__":
    main()

