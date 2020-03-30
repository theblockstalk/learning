#include "Cypher.h"
#include <iostream>
using std::list, std::string;

Cypher::Cypher(string str) : data(str.begin(), str.end()) {
    for (auto const& it: data) {
        if (it < ' ' | it > '~')
            throw std::invalid_argument("Can only use UTC-8 characters '!'-'~'");
    }
}

void Cypher::encrypt(string key)
{
    if (key.size() == 0) throw std::invalid_argument("Key should not be empty");

    string::iterator its = key.begin();
    for(list<char>::iterator it = data.begin(); it != data.end(); ++it)
    {
        int code = int(*it) + int(*its) - int(' ');
        if (code > int('~'))
            code -= int('~') - int(' ');
        *it = char(code);

        ++its;
        if (its == key.end())
            its = key.begin();
    }
}

void Cypher::decrypt(string key)
{
    if (key.size() == 0) throw std::invalid_argument("Key should not be empty");

    string::iterator its = key.begin();
    for(list<char>::iterator it = data.begin(); it != data.end(); ++it)
    {
        int code = int(*it) - int(*its) + int(' ');
        if (code < int(' '))
            code += int('~') - int(' ');
        *it = char(code);

        ++its;
        if (its == key.end())
            its = key.begin();
    }
}