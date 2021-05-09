export class UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  image: string;
  selected?: boolean;

  constructor(user) {
    this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.middleName = user.middleName;
    this.dateOfBirth = user.dateOfBirth;
    this.image = user.image;
    this.selected = false;
  }

  static fromJs(user): UserModel {
    if (user) {
      return new UserModel(user);
    }
    return null;
  }
}
