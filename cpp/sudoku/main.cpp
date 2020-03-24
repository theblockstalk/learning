#include <iostream>
#include "classes/board.h"

using std::cout, std::endl;

class sudoku {
    sudoku(board &b);

    bool solve();
};

class files {
    static board read_board(std::string file_name);
};

int main()
{
    cout << "Starting program" << endl;

    return 0;
}