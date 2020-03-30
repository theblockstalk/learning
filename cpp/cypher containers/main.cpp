#include <iostream>
#include "Cypher.h"

int main()
{
    std::size_t sc = sizeof(char);
    std::size_t sc8 = sizeof(char16_t);
    std::size_t swc = sizeof(wchar_t);
    
    Cypher c("What do you want!");
    std::cout << c << std::endl;
    c.encrypt("secret");
    std::cout << c << std::endl;
    c.decrypt("secret");
    std::cout << c << std::endl;
}