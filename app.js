/*

    Пишем РПГ бота для Ромки

    TODO: Набор игроков
    TODO: Проведение игры
    TODO: Боевая система

*/

// Переменные которые будут нужны

// Канал
var CHANNEL = "#marvellous_Mr6e3yMue";

// Админы
var admins = new Set();

//admins.add("marvellous_mr6e3ymue");
//admins.add("my4w");
// Сама игра
var game = {
    players: new Set(),
    condition:{}
}

// Подключение и опции бота
var tmi = require ('tmi.js');

var options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
        username: "marvellous_MrCJla6oyMue",
        password: "oauth:fp22g54ajiitdxpqkvwmpb79lrfcif"
    },
    channels: [CHANNEL]
};

var client = new tmi.client(options);
client.connect();


// Обработка команды
client.on('chat', function (channel, username, message) {
    if (isAdmin(username.username)) {
        adminCommands(message);
    } else {
        userCommands(message, username.username);
    }
});

function isAdmin(username) {
    var admin = false;
    admins.forEach(function (element) {
        if (username == element) admin = true;});
    return admin;
}
//TODO: Добавить команды пользователя и админа и их обработку
function adminCommands(message){
    switch (message) {
        case "!<3":
            client.action(CHANNEL, '<3 <3 <3 <3 <3 <3');
            break;
        case "!Ойвсе":
            client.action(CHANNEL, 'ОЙ ВСЕ');
            break;
        default:
    }
}

function userCommands(message, username){
    switch (message) {
        case "!игроки":
            showPlayers();
            break;
        case "!играть":
            addPlayer(username);
            break;
        case "!статы":
            showStats(username);
            break;
        case "!+":
            client.action(CHANNEL, '+');
            break;
        default:
    }
}

//TODO: Функции старт игры, конец, добавление и удаление игроков
function startGame(username) {
    client.whisper(username, ' Выберите класс:Рыцарь, Мага, Ворюга');
    client.on("whisper", function (from, userstate, message, self) {
        var player = searchPlayer(username);
        player.stats = new Stats(message);
        player.stringClass = message;
    });

}


function endGame(){}

function addPlayer(username) {
    game.players.add(new Player(username, startGame(username)));
    client.action(CHANNEL, '' + username + ' присоединяется к игре! ');
}
function removePlayer(){}

function showStats(username) {
    var element = searchPlayer(username)
       client.action(CHANNEL, '' + username +
           ": " + element.stringClass + '\n' + '\tСила: ' +
           element.stats.str + '\tЛовкость: ' +
           element.stats.dex + '\tИнтеллект: ' + element.stats.int + '\n');
    
}

function showPlayers(){
    var message = "";
    game.players.forEach(function (element) {
        message += element.name + " ";
    })
    client.action(CHANNEL, (message == "" ? "Игроков пока нет": "Текущие игроки: " + message));
}



// Конструктор игрока
function Player(user, stringClass){
    this.name = user;
    this.stringClass = stringClass;
    this.stats = new Stats(stringClass);
    this.lvl = 0;
}
// Конструктор статов
function Stats(stringClass){

    this.setStats = function (str, dex, int) {
        this.int = int;
        this.str = str;
        this.dex = dex;
    };

    switch (stringClass) {
        case "Рыцарь":
            this.setStats(8,2,1);
            break;
        case "Мага":
            this.setStats(0,3,8);
            break;
        case "Ворюга":
            this.setStats(0, 7, 4);
            break;
        default: this.setStats(0,0);
    }
}

function searchPlayer(username) {
    var result = null;

    game.players.forEach(function (element) {
        if (element.name == username)
            result = element;
    })
    return result;
}



/*
//Получение класса
client.on('chat', function (channel, username, message) {

    function getStats(class_name) {
        switch (class_name) {
            case 'Mage':
                return { str: 1, wit: 1, int: 10 };
            case 'Rogue':
                return { str: 1, dex: 10, int: 1 };
        }
    }
});


//Вывод класса
client.on('chat', function (channel, username, message) {
    if (message === '!класс') {
        client.action('#mr6e3ymue', + class_name() + 'становится');
    }
});
*/

/*
//Тестовый вариант объекта фантом
var phantom = {
    class: class_name,
    stats: ['']
}
*/