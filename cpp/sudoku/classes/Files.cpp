#include "Files.h"

Board Files::read_board(std::string file_name)
{
    ifstream my_file;
    vector<int> points;
    my_file.open(file_name);
    if (!my_file.is_open()) throw "File did not open correctly";
    int p;

    // Add each number to the vector (9*9 rows*cols)
    while (my_file >> p) {
        points.push_back(p);
    }
    my_file.close();

    return Board(points);
}