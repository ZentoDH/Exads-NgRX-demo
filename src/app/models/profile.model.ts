import { UserType } from "../enums/userType.enum";

export class Profile {
    id: string;
    name: string;
    userType: UserType;

    constructor(id: string, name: string, userType: UserType) {
        this.id = id;
        this.name = name;
        this.userType = userType;
    }
}