import {GameLG} from '../models/game';

export function getColor(game: GameLG | undefined, isHome: boolean) {
  let color = 'grey';
  if (game) {
    color = game.completed ? 'yellow' : 'grey';
    if (game.completed) {
      if (game.homeGoal > game.guestGoal) {
        color = isHome ? 'green' : 'red';
      }
      if (game.homeGoal < game.guestGoal) {
        color = isHome ? 'red' : 'green';
      }
    }
  }

  return color;
}
