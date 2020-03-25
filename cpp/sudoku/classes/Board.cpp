#include "Board.h"

Board::Board(vector<int> &points) : my_board(points) {}

Board::Board(Board &b) : my_board(b.my_board) {}

int Board::next_free_index(size_t current_index)
{
    size_t i = current_index;
    if (current_index == -1)
        i = 0;
    
    for( ; i<my_board.size(); ++i) {
        if (my_board[i] == 0) return i;
    }
    throw "No more free indexes";
}

vector<int> Board::allowed_points(size_t index)
{
    vector<bool> not_allowed(9, false);
    vector<int> allowed;

    // row
    size_t row_index = index / 9;
    for (size_t i = 0; i < 9; ++i)
    {
        int point = my_board[row_index*9 + i];
        if (point != 0)
            not_allowed[point-1] = true;
    }

    // col
    size_t col_index = index % 9;
    for (size_t i = 0; i < 9; ++i)
    {
        int point = my_board[i*9 + col_index];
        if (point != 0)
            not_allowed[point-1] = true;
    }

    // square
    size_t square_row_index = (index / 9) % 3;
    size_t square_col_index = (index % 9) % 3;
    for (size_t i = 0; i < 3; ++i)
    {
        for (size_t j = 0; j < 3; ++j)
        {
            int point = my_board[square_row_index*27 + i*9 + square_col_index*3 + j];
            if (point != 0)
                not_allowed[point-1] = true;
        }
    }

    for(std::size_t i=0; i<not_allowed.size(); ++i) 
        if (!not_allowed[i])
            allowed.push_back(i);

    return allowed;
}

void Board::solve()
{
    int free_index = next_free_index(-1);

    vector<int> allowed = allowed_points(free_index);

    for (const int point : allowed) {
        my_board[free_index] = point;

        int new_free_index;
        try {
            new_free_index = next_free_index(free_index);
        } catch (const std::exception& e) {
            // victory?
        }
        try {
            vector<int> allowed = allowed_points(free_index);

            for (const int point : allowed) {
                my_board[free_index] = point;
            }
        } catch (const std::exception& e) {
            // need to reverse previous
            my_board[free_index] = 0;
        }
    }
}