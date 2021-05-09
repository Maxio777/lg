export class SimpleUser {
  _id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  selected: boolean;

  constructor(item) {
    this._id = item._id;
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.middleName = item.middleName;
    this.fullName = `${item.lastName || ''} ${item.firstName || ''} ${item.middleName || ''}`.trim();
    this.selected = false;
  }

  static fromJs(player): SimpleUser {
    if (player) {
      return new SimpleUser(player);
    }
    return null;
  }

  static fromJsArr(players): SimpleUser[] {
    if (players && players.length) {
      return players.map(player => SimpleUser.fromJs(player));
    }
    return null;
  }
}
