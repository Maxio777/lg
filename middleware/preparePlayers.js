class PreparePlayers {

    static async addFieldsForPlayers(players, games) {
        players = JSON.parse(JSON.stringify(players));
        games = JSON.parse(JSON.stringify(games));
        players.forEach((player) => {
            player.gamesCount = this.getPlayerGamesCount(player._id, games);
            player.goalsCount = this.getPlayerGoalsCount(player._id, games);
            player.assistsCount = this.getPlayerAssistCount(player._id, games);
            player.yellow = this.getYellowCount(player._id, games);
            player.red = this.getRedCount(player._id, games);
            player.goalsAssists = player.goalsCount + player.assistsCount;
            player.autoGoals = this.getAutoGoals(player._id, games);
            player.penalty = this.getPenalty(player._id, games);
            player.yellowReds = this.getYellowReds(player._id, games);
            player.games = this.getGames(player._id, games);
            player.teams = this.getTeams(player._id, games);
        });
        return players;
    }

    static getPlayerGamesCount(id, games) {
        return games.filter(game => game.guestPlayers.filter(player => player._id === id).length
            || game.homePlayers.filter(player => player._id === id).length).length;
    }

    static getPlayerGoalsCount(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['goal', '6mGoal', '10mGoal', 'penaltyGoal'].includes(event.type) ).length).length;
    }

    static getPlayerAssistCount(id, games) {
        return games.filter(game => game.events.filter(event => event.assistant._id === id
            && ['goal', '6mGoal', '10mGoal', 'penaltyGoal'].includes(event.type) ).length).length;
    }

    static getYellowCount(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['yellow'].includes(event.type) ).length).length;
    }

    static getRedCount(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['yellowRed'].includes(event.type) ).length).length;
    }

    static getAutoGoals(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['autoGoal'].includes(event.type) ).length).length;
    }

    static getPenalty(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['penalty'].includes(event.type) ).length).length;
    }

    static getYellowReds(id, games) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && ['yellowRed'].includes(event.type) ).length).length;
    }

    static getGames(id, games) {
        return games.filter(game => [...game.guestPlayers, ...game.homePlayers].some(player => player._id === id));
    }

    static getTeams(id, games) {
        const teams = [];
        games.forEach(game => {
            if (game.guest.players.some(player => player._id === id) && !teams.some(team => team._id === game.guest._id)) {
                const { _id, name, img } = game.guest;
                teams.push({ _id, name, img });
            }
            if (game.home.players.some(player => player._id === id) && !teams.some(team => team._id === game.home._id)) {
                const { _id, name, img } = game.home;
                teams.push({ _id, name, img });
            }
        });
        return teams;
    }

}


module.exports = PreparePlayers;
