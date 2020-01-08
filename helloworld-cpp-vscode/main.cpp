#include <iostream>
#include <variant>
#include "person.h"

using namespace std;

struct Shape {
  string shape_name;

  Shape() : shape_name("shape") {}
  Shape(string _name) : shape_name(_name) {}
};

struct Rectangle : public Shape {
  uint32_t width;
  uint32_t height;

  Rectangle() : Shape("rectangle"), width(0), height(0) {}
  Rectangle(uint32_t _width, uint32_t _height) : Shape("rectangle"), width(_width), height(_height) {}
};

struct Circle : public Shape {
  uint32_t diameter;

  Circle() : Shape("circle"), diameter(0) {}
};

typedef std::variant<Rectangle, Circle> Shape_variant;

void print_shape_variant(Shape_variant &sv) {
    switch( sv.index() )
    {
        case 0:
        {
            Rectangle r = get<Rectangle>(sv);
            cout << r.shape_name << r.width << ", " << r.height << endl;
            break;
        }
        case 1:
        {
            Circle c = get<Circle>(sv);
            cout << c.shape_name << ", " << c.diameter << endl;
            break;
        }
    }
}

int main()
{
    cout << "hello world" << endl;

    Person john = Person("John");
    cout << john.getName() << endl;

    Shape *s;
    Rectangle *r;
    s = new Shape();
    cout << "s: " << s->shape_name << endl;
    r = new Rectangle(32, 52);
    cout << "r: " << r->shape_name << ", " << r->width << ", " << r->height << endl;
    Shape *sr = r;
    cout << "rp: " << sr->shape_name << endl;

    Shape_variant svr = Rectangle(11, 22);
    cout << "index: " << svr.index() << endl;
    print_shape_variant(svr);
    // cout << "Shape variant: " << sv.width << ", " << sv.height << endl;

    Shape_variant svc = Circle();
    cout << "index: " << svc.index() << endl;
    print_shape_variant(svc);
    
    return 0;
}