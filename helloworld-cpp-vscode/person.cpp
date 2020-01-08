#include "person.h"

using std::string;

Person::Person(string _name) : name(_name) {}

string Person::getName() {
    return this->name;
}