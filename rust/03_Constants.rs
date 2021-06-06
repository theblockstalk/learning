fn main() {
    const USER_LIMIT:i32 = 100;    // Declare a integer constant
    const PI:f32 = 3.14;           //Declare a float constant
 
    println!("user limit is {}",USER_LIMIT);  //Display value of the constant
    println!("pi value is {}",PI);            //Display value of the constant

    {
        let salary = 100.00;
        let salary = 1.50 ; 
        // reads first salary
        println!("The value of salary is :{}",salary);
    }

    {
        let uname = "Mohtashim";
        let uname = uname.len();
        println!("name changed to integer : {}",uname);
    }

    {
        const NAME:&str = "Mohtashim";
        // const NAME:usize = NAME.len(); 
        //Error : `NAME` already defined
        println!("name changed to integer : {}",NAME);
    }
}
