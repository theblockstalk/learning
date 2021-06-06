fn main() {
    let company:&str="TutorialsPoint";
    let location:&str = "Hyderabad";
    println!("company is : {} location :{}",company,location);

    {
        let company:&'static str = "TutorialsPoint";
        let location:&'static str = "Hyderabad";
        println!("company is : {} location :{}",company,location);
    }

    {
        let empty_string = String::new();
        println!("length is {}",empty_string.len());

        let content_string = String::from("TutorialsPoint");
        println!("length is {}",content_string.len());
    }

    {
        let mut z = String::new();
        z.push_str("hello");
        println!("{}",z);
    }

    {
        let name1 = "Hello TutorialsPoint , 
        Hello!".to_string();
        println!("{}",name1);
    }

    {
        let name1 = "Hello TutorialsPoint , 
        Hello!".to_string();         //String object
        let name2 = name1.replace("Hello","Howdy");    //find and replace
        println!("{}",name2);
    }

    {
        let example_string = String::from("example_string");
        print_literal(example_string.as_str());
    }

    {
        let mut company = "Tutorial".to_string();
        company.push('s');
        println!("{}",company);
    }

    {
        let mut company = "Tutorials".to_string();
        company.push_str(" Point");
        println!("{}",company);
    }

    {
        let fullname = " Tutorials Point \r\n";
        println!("Before trim ");
        println!("length is {}",fullname.len());
        println!();
        println!("After trim ");
        println!("length is {}",fullname.trim().len());
    }

    {
        let msg = "Tutorials Point has good tutorials".to_string();
        let mut i = 1;
        
        for token in msg.split_whitespace(){
            println!("token {} {}",i,token);
            i+=1;
        }
    }

    {
        let fullname = "Kannan,Sudhakaran,Tutorialspoint";

        for token in fullname.split(","){
            println!("token is {}",token);
        }

        //store in a Vector
        println!("\n");
        let tokens:Vec<&str>= fullname.split(",").collect();
        println!("firstName is {}",tokens[0]);
        println!("lastname is {}",tokens[1]);
        println!("company is {}",tokens[2]);
    }

    {
        let n1 = "Tutorials".to_string();

        for n in n1.chars(){
            println!("{}",n);
        }
    }

    {
        let n1 = "Tutorials".to_string();
        let n2 = "Point".to_string();
        // let n1 = "Tutorials";
        // let n2 = "Point";

        let n3 = n1 + &n2; // n2 reference is passed
        println!("{}",n3);
    }

    {
        let number = 2020;
        let number_as_string = number.to_string(); 
        
        // convert number to string
        println!("{}",number_as_string);
        println!("{}",number_as_string=="2020");
    }

    {
        let n1 = "Tutorials".to_string();
        let n2 = "Point".to_string();
        let n3 = format!("{} {}",n1,n2);
        println!("{}",n3);
    }
}

fn print_literal(data:&str ){
    println!("displaying string literal {}",data);
 }