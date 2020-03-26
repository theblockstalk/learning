#include "Cypher.h"

using std::list, std::string;

Cypher::Cypher(string str) : data(str.begin(), str.end()) {}

void Cypher::encrypt(string key)
{
    if (key.size() == 0) throw std::invalid_argument("Key should not be empty");

    string::iterator its = key.begin();
    for(list<char>::iterator it = data.begin(); it != data.end(); ++it)
    // for(auto const& it: data)
    {
        *it += *its;
        
        ++its;
        if (its == key.end())
            its = key.begin();
    }
}
