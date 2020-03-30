#ifndef WEATHER_CPP
#define WEATHER_CPP

class Weather {
    private:
        int temperature;

    public:
        Weather();
        void get();
        
        friend std::ostream& operator<<(std::ostream& os, const Weather& c)
        {
            os << "Temperature: " << temperature << std::endl;
            return os;
        }

};

#endif