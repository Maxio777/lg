export class GameHomeManagersUpdate {
  homeManagers: string[];

  constructor(managers) {
    this.homeManagers = managers.map(manager => manager._id);
  }

  static fromJs(managers): GameHomeManagersUpdate | [] {
    if (managers?.length) {
      return new GameHomeManagersUpdate(managers);
    }
    return {homeManagers: []};
  }

}
