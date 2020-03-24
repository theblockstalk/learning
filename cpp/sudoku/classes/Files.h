#ifndef FILES_CPP
#define FILES_CPP

#include <fstream>
#include "Board.h"

using std::ifstream;

class Files {
    public:
        static Board read_board(std::string file_name);
};

#endif