cmake_minimum_required(VERSION 3.5)

project(Main)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14")

set (CMAKE_CXX_STANDARD 17)

include_directories("/usr/local/boost_1_72_0")
add_executable(Main main.cpp)