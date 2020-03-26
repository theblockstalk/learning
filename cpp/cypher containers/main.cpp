#include <iostream>
#include "Cypher.h"

int main()
{
    Cypher c("What do you want!");
    c.encrypt("secret");
    std::cout << c << std::endl;
}