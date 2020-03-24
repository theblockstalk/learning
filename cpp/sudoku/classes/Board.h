#ifndef BOARD_CPP
#define BOARD_CPP

#include <vector>
#include <iostream>

using std::ostream;
using std::vector;

class Board {
    private:
        vector<int> my_board;

    public:
        Board(vector<int> &points);

        friend ostream &operator <<(ostream, Board );
        friend ostream &operator !=(Board, Board );
};

#endif
