import {Role} from "./role.enum";

export class User {
 
  firstname: string = "";
  lastname: string = "";
  firmaId:number = null;
  userName: string = "";
  password: string = "";
  email: string = "";
  phonenumber: string = "";
  role:Array<any>;

  accessToken: string = "";
  refreshToken: string = "";
 
}



