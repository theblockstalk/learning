#include "Board.h"

Board::Board(vector<int> &points) : my_board(points) {}

Board::Board(Board &b) : my_board(b.my_board) {}

size_t Board::next_free_index(size_t current_index)
{
    size_t i = current_index;
    if (current_index == -1)
        i = 0;
    
    for( ; i<my_board.size(); ++i) {
        if (my_board[i] == 0) return i;
    }
    return -1;
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
    size_t a = index / 9;
    size_t b = index % 9;
    size_t square_row_index = (index / 9) / 3;
    size_t square_col_index = (index % 9) / 3;
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
            allowed.push_back(i+1);

    return allowed;
}

bool Board::next(size_t current_index) {
    // std::cout << *this << endl;
    int free_index = next_free_index(current_index);
    if (free_index == -1)
        return true;

    vector<int> allowed = allowed_points(free_index);
    if (allowed.size() == 0)
    {
        return false;
    }
    
    for (const int point : allowed)
    {
        my_board[free_index] = point;
        if (next(free_index))
            return true;
        else
            my_board[free_index] = 0;
        
    }
    return false;
}

bool Board::solve()
{
    return next(-1);
}