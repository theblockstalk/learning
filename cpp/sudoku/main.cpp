#include <iostream>
#include "classes/Board.h"
#include "classes/Files.h"

using std::cout, std::endl;

int main(int argc, char **argv)
{
    try {
        Board test1_board = Files::read_board(argv[1]);
        cout << "Input board" << endl << test1_board << endl;

        if(test1_board.solve())
        cout << "Solved board" << endl << test1_board << endl;
        else
        cout << "Board cannot be solved" << endl;
    } catch (const char* e) {
        cout << e << endl;
        return 1;
    }

    return 0;
}