import tkinter as tk
from tkinter import messagebox
from tkinter import font as tkFont


class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Tic Tac Toe")
        self.root.geometry("500x600")
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f0f0")
        
        # Game state
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.game_over = False
        
        # Configure fonts
        self.button_font = tkFont.Font(family="Arial", size=32, weight="bold")
        self.title_font = tkFont.Font(family="Arial", size=24, weight="bold")
        self.status_font = tkFont.Font(family="Arial", size=14)
        
        self.create_widgets()
    
    def create_widgets(self):
        # Title
        title_label = tk.Label(
            self.root,
            text="Tic Tac Toe",
            font=self.title_font,
            bg="#f0f0f0",
            fg="#333333"
        )
        title_label.pack(pady=20)
        
        # Status label
        self.status_label = tk.Label(
            self.root,
            text=f"Current Player: {self.current_player}",
            font=self.status_font,
            bg="#f0f0f0",
            fg="#444444"
        )
        self.status_label.pack(pady=10)
        
        # Game board frame
        board_frame = tk.Frame(self.root, bg="#f0f0f0")
        board_frame.pack(pady=20)
        
        # Create buttons for the board
        self.buttons = []
        for i in range(3):
            row = []
            for j in range(3):
                button = tk.Button(
                    board_frame,
                    text="",
                    font=self.button_font,
                    width=4,
                    height=2,
                    bg="#ffffff",
                    fg="#333333",
                    relief="raised",
                    borderwidth=2,
                    command=lambda r=i, c=j: self.make_move(r, c)
                )
                button.grid(row=i, column=j, padx=5, pady=5)
                row.append(button)
            self.buttons.append(row)
        
        # Reset button
        reset_button = tk.Button(
            self.root,
            text="New Game",
            font=self.status_font,
            bg="#4CAF50",
            fg="white",
            activebackground="#45a049",
            activeforeground="white",
            relief="raised",
            borderwidth=2,
            padx=20,
            pady=10,
            command=self.reset_game
        )
        reset_button.pack(pady=20)
    
    def make_move(self, row, col):
        """Handle a player's move."""
        if self.game_over or self.board[row][col] != '':
            return
        
        # Update board and button
        self.board[row][col] = self.current_player
        self.buttons[row][col].config(
            text=self.current_player,
            state="disabled",
            bg="#e8f5e9" if self.current_player == 'X' else "#fff3e0"
        )
        
        # Check for winner
        winner = self.check_winner()
        if winner:
            self.game_over = True
            self.disable_all_buttons()
            self.status_label.config(text=f"Player {winner} Wins! 🎉")
            messagebox.showinfo("Game Over", f"Congratulations! Player {winner} wins!")
            return
        
        # Check for tie
        if self.is_board_full():
            self.game_over = True
            self.disable_all_buttons()
            self.status_label.config(text="It's a Tie! 🤝")
            messagebox.showinfo("Game Over", "It's a tie! Well played both players!")
            return
        
        # Switch player
        self.current_player = 'O' if self.current_player == 'X' else 'X'
        self.status_label.config(text=f"Current Player: {self.current_player}")
    
    def check_winner(self):
        """Check if there's a winner."""
        # Check rows
        for row in self.board:
            if row[0] == row[1] == row[2] != '':
                self.highlight_winner(row[0])
                return row[0]
        
        # Check columns
        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] != '':
                self.highlight_winner(self.board[0][col])
                return self.board[0][col]
        
        # Check diagonals
        if self.board[0][0] == self.board[1][1] == self.board[2][2] != '':
            self.highlight_winner(self.board[0][0])
            return self.board[0][0]
        
        if self.board[0][2] == self.board[1][1] == self.board[2][0] != '':
            self.highlight_winner(self.board[0][2])
            return self.board[0][2]
        
        return None
    
    def highlight_winner(self, winner):
        """Highlight the winning combination."""
        # Check rows
        for i in range(3):
            if self.board[i][0] == self.board[i][1] == self.board[i][2] == winner:
                for j in range(3):
                    self.buttons[i][j].config(bg="#81c784")
                return
        
        # Check columns
        for j in range(3):
            if self.board[0][j] == self.board[1][j] == self.board[2][j] == winner:
                for i in range(3):
                    self.buttons[i][j].config(bg="#81c784")
                return
        
        # Check main diagonal
        if self.board[0][0] == self.board[1][1] == self.board[2][2] == winner:
            for i in range(3):
                self.buttons[i][i].config(bg="#81c784")
            return
        
        # Check anti-diagonal
        if self.board[0][2] == self.board[1][1] == self.board[2][0] == winner:
            self.buttons[0][2].config(bg="#81c784")
            self.buttons[1][1].config(bg="#81c784")
            self.buttons[2][0].config(bg="#81c784")
    
    def is_board_full(self):
        """Check if the board is full."""
        for row in self.board:
            for cell in row:
                if cell == '':
                    return False
        return True
    
    def disable_all_buttons(self):
        """Disable all buttons after game over."""
        for row in self.buttons:
            for button in row:
                button.config(state="disabled")
    
    def reset_game(self):
        """Reset the game to initial state."""
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.game_over = False
        
        # Reset all buttons
        for row in self.buttons:
            for button in row:
                button.config(
                    text="",
                    state="normal",
                    bg="#ffffff"
                )
        
        self.status_label.config(text=f"Current Player: {self.current_player}")


def main():
    root = tk.Tk()
    app = TicTacToeGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()

