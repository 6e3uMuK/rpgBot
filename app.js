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


/* 
 * //Не знаю нужно ли это но пока уберу
// User join to chat
client.on("join", function (channel, username) {
  //  client.action("#marvellous_li", username + " , glad to see you!");
  //  process.stdout.write('пришла команда ' + client.on + '\n');
})

// Timeout function
function timeOut(message) {
    splitMSG = message.split(" ");
    timeoutUserName = splitMSG[1];
    timeoutDuration = splitMSG[2];
    client.timeout(CHANNEL, timeoutUserName, timeoutDuration);
    client.action(CHANNEL, timeoutUserName + ' now u have timeout mode! Duration: ' + timeoutDuration);
}

// Split command
function splitMessage(message) {
    if ((message.indexOf('!to')) !== -1){
        timeOut(message);
    } else if ((message.indexOf('!clear')) !== -1){
        client.clear(CHANNEL);
    }

}

// Commands
client.on('chat', function (channel, username, message) {

    if (username.username === "#marvellous_Mr6e3yMue"){
        // Admin commands
        splitMessage(message);
    } else {
        // Users commands
        switch (message) {
            case "!fb":
                client.action(CHANNEL, 'your-fb-link-here');
                break;
            case "!twt":
                client.action(CHANNEL, 'Гыввауц');
                break;
            default:
        }
    }
});
*/

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
function startGame() {}
function endGame(){}

function addPlayer(username) {
    game.players.add(new Player(username,"mage"));
    client.action(CHANNEL, '' + username + ' присоединяется к игре! ');
}
function removePlayer(){}

function showStats(username) {
    game.players.forEach(function (element) {
        if (element.name == username) client.action(CHANNEL, '' + username +
            ": " + element.stringClass +'\n' + '\tСила: ' +
            element.stats.str + '\tИнтеллект: ' + element.stats.int + '\n');
    })
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

    this.setStats = function (str, int) {
        this.int = int;
        this.str = str;
    };

    switch (stringClass) {
        case "rogue":
            this.setStats(10,0);
            break;
        case "mage":
            this.setStats(0,5);
            break;
        default: this.setStats(0,0);
    }
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