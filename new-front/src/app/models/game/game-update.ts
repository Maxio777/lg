import {GameCreate} from '@models/game/game-create';

export class GameUpdate extends GameCreate{
  _id: string;

  constructor(game) {
    super(game);
    this._id = game._id;
  }

  static fromJS(game): GameCreate {
    if (game) {
      return new GameUpdate(game);
    }
    return null;
  }

}
