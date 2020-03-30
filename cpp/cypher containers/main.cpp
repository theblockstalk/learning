#include <iostream>
#include "Cypher.h"

int main(int argc, char **argv)
{
    Cypher c("What do you want!");
    std::cout << c << std::endl;
    c.encrypt("secret");
    std::cout << c << std::endl;
    c.decrypt("secret");
    std::cout << c << std::endl;
}