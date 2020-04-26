class PreparePlayers {

    static async addFieldsForPlayers(players, games) {

        players = JSON.parse(JSON.stringify(players));
        games = JSON.parse(JSON.stringify(games));

        const goals = ['goal', '6mGoal', '10mGoal', 'penaltyGoal'];
        const yellow = ['yellow'];
        const red = ['red'];
        const autoGoal = ['autoGoal'];
        const penalty = ['penalty'];
        const yellowRed = ['yellowRed'];
        const assists = ['goal', '6mGoal', '10mGoal', 'penaltyGoal'];

        players.forEach((player) => {
            player.gamesCount = this.getPlayerGamesCount(player._id, games);
            player.goalsCount = this.getEventCount(player._id, games, goals);
            player.assistsCount = this.getPlayerAssistCount(player._id, games, assists);
            player.yellow = this.getEventCount(player._id, games, yellow);
            player.red = this.getEventCount(player._id, games, red);
            player.goalsAssists = player.goalsCount + player.assistsCount;
            player.autoGoals = this.getEventCount(player._id, games, autoGoal);
            player.penalty = this.getEventCount(player._id, games, penalty);
            player.yellowReds = this.getEventCount(player._id, games, yellowRed);
            player.games = this.getGames(player._id, games);
            player.teams = this.getTeams(player._id, games);
        });
        return players;
    }

    static getPlayerGamesCount(id, games) {
        return games.filter(game => game.guestPlayers.filter(player => player._id === id).length
            || game.homePlayers.filter(player => player._id === id).length).length;
    }

    static getEventCount(id, games, events) {
        return games.filter(game => game.events.filter(event => event.owner._id === id
            && events.includes(event.type) ).length).length;
    }

    static getPlayerAssistCount(id, games, events) {
        return games.filter(game => game.events.filter(event => event.assistant._id === id
            && events.includes(event.type) ).length).length;
    }

    static getGames(id, games) {
        return games.filter(game => [...game.guestPlayers, ...game.homePlayers].some(player => player._id === id));
    }

    static getTeams(id, games) {
        const teams = [];
        const homeOrGuest = (game, team) => {
            if (game[team].players.some(player => player._id === id) && !teams.some(team => team._id === game[team]._id)) {
                const { _id, name, img } = game[team];
                teams.push({ _id, name, img });
            }
        };
        games.forEach(game => {
            homeOrGuest(game, 'guest');
            homeOrGuest(game, 'home');
        });
        return teams;
    }

}


module.exports = PreparePlayers;
