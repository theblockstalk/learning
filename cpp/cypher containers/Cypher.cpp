#include "Cypher.h"

using std::list, std::string;

Cypher::Cypher(std::string _input)
{
    std::copy(_input.begin(), _input.end(), data.begin());
}

