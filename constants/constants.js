

const ROLES = ['USER', 'ADMIN', 'SYSTEM_ADMIN'];
const FORMATS_TOURNAMENTS = ['5x5', '6x6', '7x7', '8x8', '11x11'];
// const TYPES_EVENTS = ['goal', 'assist', 'yellow', 'red', 'yellowRed', '6m', '6mGoal', '10m', '10mGoal', 'penalty', 'penaltyGoal', 'autoGoal' ];

const TYPES_EVENTS = {
    Goal: 'Гол',
    Assist: 'Ассист',
    Yellow: 'Желтая карточка',
    Red: 'Красноая карточка',
    YellowRed: 'Вторая желтая карточка',
    Penalty: 'Пенальти',
    PenaltyGoal: 'Гол с пенальти',
    TenMeterStrike: 'Десяти метрвый удар',
    TenMeterGoa: 'Гол с десяти метрового удара',
    AutoGoal: 'Автогол'
}


module.exports.ROLES = ROLES;
module.exports.FORMATS_TOURNAMENTS = FORMATS_TOURNAMENTS;
module.exports.TYPES_EVENTS = TYPES_EVENTS;
