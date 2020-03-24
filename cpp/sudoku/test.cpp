// https://github.com/vpamrit/SudokuSolver/tree/master/tests

#include <iostream>
#include "board.h"
#include "files.h"
#include "sudoku.h"

using std::cout, std::endl;

int main()
{
    cout << "Starting tests" << endl;

    board test1_board = files::read_board("test1.txt");
    sudoku test1(test1_board);
    test1.solve();
    board test1_soln_board = files::read_board("test1-solution.txt");
    if (test1_board <> test1_soln_board) {
        cout << test1_board << endl << test1_soln_board << endl;
        throw "Boards do not match";
    }
    return 0;
}