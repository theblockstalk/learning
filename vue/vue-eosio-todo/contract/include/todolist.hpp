#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT todolist : public contract {
  public:
    using contract::contract;

    ACTION createitem(name from, string item);
    ACTION toggledone(name from, uint32_t id);
    ACTION clear();

  private:
    TABLE todo {
      uint32_t id;
      string   todo;
      bool     completed;
      auto primary_key() const { return id; }
    };
    typedef multi_index<name("todo"), todo> todo_table;

    TABLE scopes {
      name user;
      auto primary_key() const { return user.value; }
    };
    typedef multi_index<name("scopes"), scopes> scopes_table;
};