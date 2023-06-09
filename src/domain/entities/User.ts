class User {
    id: string;
    name: string;
    email: string;
    password: string;
    mobile: string;
  
    constructor(name: string, email: string, password: string, mobile: string, id?: string) {
      this.id = id || '';
      this.name = name;
      this.email = email;
      this.password = password;
      this.mobile = mobile;
    }
  }
  
  export default User;
  