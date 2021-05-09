import {UserModel} from '@models/users/user-model';

export class RefereeModel extends UserModel {
  constructor(referee) {
    super(referee);
  }

  static fromJs(referee): RefereeModel {
    if (referee) {
      return new RefereeModel(referee);
    }
    return null;
  }

  static fromJsArr(referees): RefereeModel[] {
    if (referees && referees.length) {
      return referees.map(referee => RefereeModel.fromJs(referee));
    }
    return null;
  }
}
