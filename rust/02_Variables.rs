fn main() {
    let fees = 25_000;
    let salary:f64 = 35_000.00;
    println!("fees is {} and salary is {}",fees,salary);

    {
        let fees = 25_000;
        println!("fees is {} ",fees);
        // error!
        // fees = 35_000;
        // println!("fees changed is {}",fees);
    }

    {
        let mut fees:i32 = 25_000;
        println!("fees is {} ",fees);
        fees = 35_000;
        println!("fees changed is {}",fees);
    }
}