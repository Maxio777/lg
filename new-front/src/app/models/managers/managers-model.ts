import {UserModel} from '@models/users/user-model';

export class ManagersModel extends UserModel {

  constructor(manager) {
    super(manager);
  }

  static fromJs(manager): ManagersModel {
    if (manager) {
      return new ManagersModel(manager);
    }
    return null;
  }

  static fromJsArr(managers): ManagersModel[] {
    if (managers && managers.length) {
      return managers.map(manager => ManagersModel.fromJs(manager));
    }
    return null;
  }

}
