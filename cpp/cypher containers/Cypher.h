#ifndef CYPHER_CPP
#define CYPHER_CPP

#include <iterator>
#include <string>
#include <algorithm>
#include <list>
#include <exception>

class Cypher {
    private:
        std::list<char> data;

    public:
        Cypher(std::string);
        void encrypt(std::string);
        void decrypt(std::string);
        
        friend std::ostream& operator<<(std::ostream& os, const Cypher& c)
        {
            for(std::list<char>::const_iterator it = c.data.begin(); it != c.data.end(); ++it) {
                os << *it;
            }
            return os;
        }

};

#endif