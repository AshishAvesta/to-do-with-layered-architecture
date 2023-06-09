class CreateUserDto {
    name: string;
    email: string;
    password: string;
    mobile: string;
  
    constructor(name: string, email: string, password: string, mobile: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.mobile = mobile;
    }
  }
  
  export default CreateUserDto;
  