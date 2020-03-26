#ifndef CYPHER_CPP
#define CYPHER_CPP

#include <iterator>
#include <string>
#include <algorithm>
#include <list>

class Cypher {
    private:
        std::list<char> data;

    public:
        Cypher(std::string);
        void encrypt();

        friend std::ostream& operator<<(std::ostream& os, const Cypher& c)
        {
            for(std::list<char>::const_iterator it = c.data.begin(); it != c.data.end(); ++it) {
                char ch = *it;
                os << *it;
            }
            return os;
        }

};

#endif