
﻿var tmi = require ('tmi.js');

var options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
        username: "ServantOfCinder",
        password: "oauth:jku3pl0l4cei9uvzrphm2qrtyoefyr"
    },
    channels: ["#marvellous_li"]
};

var client = new tmi.client(options);
client.connect();

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
    client.timeout("#marvellous_li", timeoutUserName, timeoutDuration);
    client.action('#marvellous_li', timeoutUserName + ' now u have timeout mode! Duration: ' + timeoutDuration);
}

// Split command
function splitMessage(message) {
    if ((message.indexOf('!to')) !== -1){
        timeOut(message);
    } else if ((message.indexOf('!clear')) !== -1){
        client.clear("#marvellous_li");
    }

}

// Commands
client.on('chat', function (channel, username, message) {

    if (username.username === "#marvellous_li"){
        // Admin commands
        splitMessage(message);
    } else {
        // Users commands
        switch (message) {
            case "!fb":
                client.action('#marvellous_li', 'your-fb-link-here');
                break;
            case "!twt":
                client.action('#marvellous_li', 'Гыввауц');
                break;
            default:
        }
    }
});

//Статы
client.on('chat', function (channel, username, message) {

    switch (message) {
        case "!статы":
            client.action('#marvellous_li', 'ваши статы равны 0');
            break;
        case "!+":
            client.action('#marvellous_li', '+');
            break;
        default:
    }
});


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













/*
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
=======
﻿var tmi = require ('tmi.js');

var options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
        username: "ServantOfCinder",
        password: "oauth:jku3pl0l4cei9uvzrphm2qrtyoefyr"
    },
    channels: ["#marvellous_li"]
};

var client = new tmi.client(options);
client.connect();

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
    client.timeout("#marvellous_li", timeoutUserName, timeoutDuration);
    client.action('#marvellous_li', timeoutUserName + ' now u have timeout mode! Duration: ' + timeoutDuration);
}

// Split command
function splitMessage(message) {
    if ((message.indexOf('!to')) !== -1){
        timeOut(message);
    } else if ((message.indexOf('!clear')) !== -1){
        client.clear("#marvellous_li");
    }

}

// Commands
client.on('chat', function (channel, username, message) {

    if (username.username === "#marvellous_li"){
        // Admin commands
        splitMessage(message);
    } else {
        // Users commands
        switch (message) {
            case "!fb":
                client.action('#marvellous_li', 'your-fb-link-here');
                break;
            case "!twt":
                client.action('#marvellous_li', 'Гыввауц');
                break;
            default:
        }
    }
});

//Статы
client.on('chat', function (channel, username, message) {

    switch (message) {
        case "!статы":
            client.action('#marvellous_li', 'ваши статы равны 0');
            break;
        case "!+":
            client.action('#marvellous_li', '+');
            break;
        default:
    }
});


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













/*
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
>>>>>>> */