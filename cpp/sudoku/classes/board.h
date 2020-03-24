#include <vector>
#include <iostream>

using std::ostream;

using std::vector;

class board {
    private:
        vector<int> my_board;

    public:
        board(vector<int> &points);

        friend ostream &operator <<(ostream, board );
};
