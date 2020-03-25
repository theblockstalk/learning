// https://github.com/vpamrit/SudokuSolver/tree/master/tests

#include <iostream>
#include "classes/Board.h"
#include "classes/Files.h"
#include "classes/Sudoku.h"

using std::cout, std::endl;

int main()
{
    cout << "Starting tests" << endl;

    Board test1_board = Files::read_board("../tests/test1.txt");
    cout << "Input board" << endl << test1_board << endl;
    Sudoku test1(test1_board);
    test1.solve();
    Board test1_soln_board = Files::read_board("test1-solution.txt");
    if (test1_board != test1_soln_board) {
        cout << test1_board << endl << test1_soln_board << endl;
        throw "Boards do not match";
    }
    
    return 0;
}