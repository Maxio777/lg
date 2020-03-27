export const URLS_ADMIN = {
  admin: {
    route: '',
    url: '/admin',
    title: 'АДМИН',

    player: {
      route: 'player',
      url: '/admin/player',
      title: 'АДМИН ПЛЕЕР'
    },

    tournaments: {
      route: 'tournaments',
      url: '/admin/tournaments',
      title: 'ТУРНИРЫ'
    },

    referees: {
      route: 'referees',
      url: '/admin/referees',
      title: 'Судьи'
    },

    manager: {
      route: 'manager',
      url: '/admin/manager',
      title: 'Менеджерыы'
    },

    gamesTournament: {
      route: 'games/tournament/:id',
      url: '/admin/games/tournament/',
      title: 'ГЕЙМС ТОРНАМЕНТ'
    },

    news: {
      route: 'news',
      url: '/admin/news',
      title: 'НОВОСТИ',
    },

    newsDetail: {
      route: 'news/:id',
      url: '/admin/news/',
      title: 'НОВОСТЬ',
    },

    newsNew: {
      route: 'news-new',
      url: '/admin/news-new/',
      title: 'ДОБАВИТЬ ННОВОСТЬ',
    },

    team: {
      route: 'team',
      url: '/admin/team',
      title: 'КОМАНДЫ',

      detail: {
        route: 'team/detail',
        url: '/admin/team/detail',
        title: 'КОМАНДА',
      }

    },

    game: {
      route: 'game',
      url: '/admin/games',
      title: 'ИГРЫ'
    },

    gameDetail: {
      route: 'game/:id',
      url: '/admin/game/',
      title: 'ИГРА',
    },

    gameNew: {
      route: 'game-new',
      url: '/admin/game-new/',
      title: 'ДОБАВИТЬ ИГРУ',
    },

    games: {
      route: 'games/:id',
      url: '/admin/games/',
      title: 'АДМИН ПЛЕЕР'
    },
  }
};
