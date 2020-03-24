#ifndef SUDOKU_CPP
#define SUDOKU_CPP

#include "Board.h"

class Sudoku {
    public:
        Sudoku(Board &b);

        void solve();
};

#endif