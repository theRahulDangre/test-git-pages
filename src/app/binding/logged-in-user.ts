export class LoggedInUser{

  constructor(
    private _username: string,
    private _firstName: string,
    private _roles: string[]
  ){}

  get username(): string{
    return this._username;
  }
  get firstName(): string{
    return this._firstName;
  }
  get roles(): string[]{
    return this._roles;
  }

  hasAnyRole(roles: string[]):boolean{
    let indexOfUserRoles = this._roles
                                    .findIndex(
                                      //predicate [always return true/false]
                                      (value, index, objArray)=>{
                                        if(roles.indexOf(value)>=0){
                                          return true;
                                        }
                                        return false;
                                      }
                                    );
      if(indexOfUserRoles>=0){
        return true;
      }
      return false;
  }
}
