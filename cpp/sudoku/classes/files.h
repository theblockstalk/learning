#include <fstream>
#include "board.h"

using std::ifstream;

class files {
    public:
        static board read_board(std::string file_name);
};