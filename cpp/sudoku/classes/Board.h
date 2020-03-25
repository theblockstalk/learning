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
            const std::string break_line = "----------------------";
            os << break_line << endl;
            os << "| ";
            for( const int it : b.my_board ) {
                if (it == 0)
                    os << ' ';
                else
                    os << it;
                
                if((count+1) % 3 == 0)
                    os << '|';
                if ((count+1) % 9 == 0)
                {
                    os << endl;
                    if ((count+1) % 27 == 0)
                        os << break_line << endl;
                    if (count != 80)
                        os << '|';
                }
                os << ' ';
                ++count;
            }
                
            return os;
        }

        friend bool operator==(Board& b1, Board& b2)
        {
            if ( b1.my_board.size() != b2.my_board.size() ) throw "Boards have different sizes";

            for(vector<int>::size_type i = 0; i != b1.my_board.size(); i++) {
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
