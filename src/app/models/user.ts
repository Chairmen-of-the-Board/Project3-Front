export class User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;

    constructor(_id: number, _email: string, _password: string, _firstname: string, _lastname: string, _address: string, _phone: string) {
        this.id = _id;
        this.email = _email;
        this.password = _password;
        this.firstname= _firstname;
        this.lastname= _lastname;
        this.address= _address;
        this.phone= _phone;
    }
}
