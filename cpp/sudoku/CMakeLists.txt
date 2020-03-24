cmake_minimum_required(VERSION 3.5)

project(Sudoku)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14")

set (CMAKE_CXX_STANDARD 17)

add_executable(Sudoku main.cpp classes/board.cpp classes/sudoku.cpp classes/files.cpp)

## cmake .
## make
## ./Sudoku