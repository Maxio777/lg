export class GameGuestManagersUpdate {
  guestManagers: string[];

  constructor(managers) {
    this.guestManagers = managers.map(manager => manager._id);
  }

  static fromJs(managers): GameGuestManagersUpdate | [] {
    if (managers?.length) {
      return new GameGuestManagersUpdate(managers);
    }
    return {guestManagers: []};
  }

}
