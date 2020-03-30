#include <iostream>
#include "Weather.h"

int main(int argc, char **argv)
{
    Weather w;
    w.get();
    std::cout << w << std::endl;
}