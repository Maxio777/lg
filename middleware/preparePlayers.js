const EventTypes = {
        Goal: 1,            // 'Гол'
        Assist: 2,          // 'Ассист'
        Yellow: 3,          // 'Желтая карточка'
        Red: 4,             // 'Красноая карточка'
        YellowRed: 5,       // 'Вторая желтая карточка'
        Penalty: 6,         // 'Пенальти'
        PenaltyGoal: 7,     // 'Гол с пенальти'
        AutoGoal: 8         // 'Автогол'
}

class PreparePlayers {

    static async addFieldsForPlayers(players, games) {

        players = JSON.parse(JSON.stringify(players));
        games = JSON.parse(JSON.stringify(games));

        const goals = [EventTypes.Goal, EventTypes.PenaltyGoal];
        const yellow = [EventTypes.Yellow];
        const red = [EventTypes.Red];
        const autoGoal = [EventTypes.AutoGoal];
        const penalty = [EventTypes.PenaltyGoal];
        const yellowRed = [EventTypes.YellowRed];
        const assists = [EventTypes.Goal];

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
        let _count = 0;
        games.forEach(g => g.events.forEach(e => {
            if (e && e.type && e.owner && e.owner._id === id && events.includes(e.type) ) {
                _count++
            }
        }))
        return _count
    }

    static getPlayerAssistCount(id, games, events) {
        return games.filter(game => game.events.filter(event =>
            event.assistant
            && event.assistant._id === id
            && events.includes(event.type) ).length).length;
    }

    static getGames(id, games) {
        return games.filter(game => [...game.guestPlayers, ...game.homePlayers].some(player => player._id === id));
    }

    static getTeams(id, games) {
        const teams = [];
        const homeOrGuest = (game, homeGuest) => {
            if (game[homeGuest].players.some(player => player._id === id) && !teams.some(team => team._id === game[homeGuest]._id)) {
                const { _id, name, img } = game[homeGuest];
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
