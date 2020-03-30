cmake_minimum_required(VERSION 3.5)

project(Weather)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14")

set (CMAKE_CXX_STANDARD 17)

set(restclient-cpp_DIR "build/vcpkg/buildtrees/restclient-cpp/x64-linux-dbg")

find_package(restclient-cpp CONFIG REQUIRED)
target_link_libraries(Weather PRIVATE restclient-cpp)

add_executable(Weather main.cpp Weather.cpp)