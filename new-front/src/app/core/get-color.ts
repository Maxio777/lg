import {GameLG} from '@models/game/game';

export function getColor(game: GameLG | undefined, isHome: boolean): string {
  let color = 'grey';
  if (game) {
    color = game.completed ? 'orange' : 'grey';
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
