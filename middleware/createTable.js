class TeamTable {
    _id = '';
    teamName = '';
    img = '';
    gamesCount = 0;
    win = 0;
    draws = 0;
    loss = 0;
    points = 0;
    goals = 0;
    missedGoals = 0;
    goalDifference = 0;
    outcomes = [];

    constructor(team) {
        this._id = team._id;
        this.teamName = team.name;
        this.img = team.img;
    }
}

class Table {

    static async createTables(games) {
        games = JSON.parse(JSON.stringify(games)).filter(g => !!g._id);


        games = games.filter(g => g.completed).sort((a, b) => {
            if (+a.tour < +b.tour) {
                return -1;
            }
            if (+a.tour > +b.tour) {
                return 1;
            }
            return 0;
        })

        const teams = Table.getTeams(games);

        teams.forEach(team => {
            const currentGames = Table.getGames(team._id, games);
            team.gamesCount = currentGames.length;
            team.win = Table.getWin(team._id, currentGames).length;
            team.draws = Table.getDraws(currentGames);
            team.loss = Table.getLoss(team._id, currentGames).length;
            team.points = (team.win * 3) + team.draws;
            team.goals = Table.getGoals(team._id, currentGames);
            team.missedGoals = Table.getMissedGoals(team._id, currentGames);
            team.goalDifference = team.goals - team.missedGoals;
            team.outcomes = Table.getOutcomes(team._id, currentGames.splice(-5))
        });

        return teams.sort((aTeam, bTeam) => {
            if (aTeam.points > bTeam.points) {
                return -1;
            }
            if (aTeam.points < bTeam.points) {
                return 1;
            }
            if (aTeam.goalDifference > bTeam.goalDifference) {
                return -1;
            }
            if (aTeam.goalDifference < bTeam.goalDifference) {
                return 1;
            }
            return 0;
        });
    }


    static getOutcomes(id, fiveLastGames) {
        const result = []

        fiveLastGames.forEach(game => {

            if ( (game.home._id === id) && (+game.guestGoal < +game.homeGoal) ) {
                result.push(1)
                return
            }
            if ( (game.home._id === id) && (+game.guestGoal > +game.homeGoal) ) {
                result.push(2)
                return
            }

            if ( (game.guest._id === id) && (+game.guestGoal > +game.homeGoal) ) {
                result.push(1)
                return
            }
            if ( (game.guest._id === id) && (+game.guestGoal < +game.homeGoal) ) {
                result.push(2)
                return
            }
            if ( (game.guest._id === id || game.home._id === id) && (+game.guestGoal === +game.homeGoal) ) {
                result.push(3)

            }

        })

        if (result.length < 5) {
            while (result.length < 5) {
                result.unshift(0)
            }
        }

        return result
    }

    static getTeams(games) {
        const teams = [];
        games.forEach(game => {

            if (!teams.some((team) => (team._id === game.home._id))) {
                const team = new TeamTable(game.home);
                teams.push(team);
            }
            if (!teams.some((team) => (team._id === game.guest._id))) {
                const team = new TeamTable(game.guest);
                teams.push(team);
            }
        });

        return teams
    }

    static getGames(id, games) {
        return games.filter(game => ((game.home._id === id) || (game.guest._id === id)));
    }

    static getWin(id, games) {
        return games.filter(game =>
            ((game.guest._id === id) && (game.guestGoal > game.homeGoal))
            || ((game.home._id === id) && (game.homeGoal > game.guestGoal)) );
    }

    static getDraws(games) {
        return games.filter(game => game.homeGoal === game.guestGoal ).length;
    }

    static getLoss(id, games) {
        return games.filter(game =>
            ((game.guest._id === id) && (game.guestGoal < game.homeGoal))
            || ((game.home._id === id) && (game.homeGoal < game.guestGoal)) );
    }

    static getGoals(id, games) {
        let goals = 0;
        games.forEach(game => game.guest._id === id ? goals += game.guestGoal : goals += game.homeGoal);
        return goals;
    }

    static getMissedGoals(id, games) {
        let goals = 0;
        games.forEach(game => game.guest._id === id ? goals += game.homeGoal : goals += game.guestGoal);
        return goals;
    }

}


module.exports = Table
