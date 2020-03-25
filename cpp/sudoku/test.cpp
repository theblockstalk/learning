// https://github.com/vpamrit/SudokuSolver/tree/master/tests

#include <iostream>
#include "classes/Board.h"
#include "classes/Files.h"

using std::cout, std::endl, std::string;

void solve_board(string board_file, string board_solution_file)
{
    Board test1_board = Files::read_board(board_file);
    cout << "Input board" << endl << test1_board << endl;

    if(!test1_board.solve())
        throw "Board cannot be solved";

    cout << "Solved board" << endl << test1_board << endl;

    Board test1_soln_board = Files::read_board(board_solution_file);
    if (test1_board != test1_soln_board) {
        cout << test1_board << endl << test1_soln_board << endl;
        throw "Boards do not match";
    }
}

int main()
{
    cout << "Starting tests" << endl;

    solve_board("../tests/test1.txt", "../tests/test1-solution.txt");
    solve_board("../tests/hard1.txt", "../tests/hard1-solution.txt");
    solve_board("../tests/impossible.txt", "../tests/hard1-solution.txt");
    return 0;
}