#ifndef person_h
#define person_h
#include <string>

class Person
{
    public:
        Person(std::string _name);
        std::string getName();

    private:
        std::string name;
};
#endif