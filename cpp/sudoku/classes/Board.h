#ifndef BOARD_CPP
#define BOARD_CPP

#include <vector>
#include <iostream>

using std::ostream, std::endl;
using std::vector;

class Board {
    private:
        vector<int> my_board;

    public:
        Board(vector<int> &points);

        friend ostream& operator<<(ostream& os, const Board& b)
        {
            int count = 0;
            for( const int it : b.my_board ) {
                os << ((it == 0) ? ' ' : it) << ' ';
                if (count % 9 == 0)
                    os << endl;
                ++count;
            }
                
            return os;
        }

        friend bool operator==(Board& b1, Board& b2)
        {
            if ( b1.my_board.size() != b2.my_board.size() ) throw "Boards have different sizes";

            for(std::vector<int>::size_type i = 0; i != b1.my_board.size(); i++) {
                if (b1.my_board[i] != b2.my_board[i]) return false;
            }

            return true;
        }

        friend bool operator!=(Board& b1, Board& b2)
        {
            return !(b1 == b2);
        }

};

#endif
