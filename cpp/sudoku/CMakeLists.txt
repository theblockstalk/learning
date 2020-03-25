cmake_minimum_required(VERSION 3.5)

# project(Sudoku)
project(Sudoku_tests)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14")

set (CMAKE_CXX_STANDARD 17)

# add_executable(Sudoku main.cpp classes/Board.cpp classes/Files.cpp)
add_executable(Sudoku_tests test.cpp classes/Board.cpp classes/Files.cpp)