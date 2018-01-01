var SlackBot = require('slackbots');
 
// create a bot
var bot = new SlackBot({
    token: 'xoxb-286280430912-uzuC9QsOkJcuaNsJTDTChYlP', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'DeepVisionBot'
});
 
var params = {
    icon_emoji: ':robot_face:'
};

bot.on('start', function() {
});

bot.on('message', async function(data) {
    console.log(data);
    if (data.subtype === "bot_message") return;

    if (data.type === "message") {
        if (data.text.substring(0, 4) === "dv8 ") {

            command = data.text.substring(4, data.text.length)
            var user = await bot.getUserById("U85LRRY9J");
            try {
                var channel = await bot.getChannelById(data.channel);
            } catch(err) {
                var channel = null;
            }

            if (command === "help") {
                if (channel != null) { bot.postMessageToChannel(channel.name, "<@" + user.id +">, Sent you a direct message with information", params) }
                bot.postMessageToUser(user.name, "*Bot Information*:\n\n*Prefix:*\ndv8 - To use a command, say \"dv8 [command]\"\n\n*Commands:*\nhelp - gives information on how to use the bot.\nschedule - gives a link to our season schedule.\nwebsite - gives a link to our website.\ngithub - gives a link to our github group.", params);
            }

            else if (command === "schedule") {
                if (channel != null) { bot.postMessageToChannel(channel.name, "7308 Season Schedule:\nhttps://docs.google.com/spreadsheets/d/1CCOevI4uQ2HtOXUji8ytj6n4uwKrSt6HpcUA8AorseY/view#gid=0", params) }
                else { bot.postMessageToUser(user.name, "7308 Season Schedule:\nhttps://docs.google.com/spreadsheets/d/1CCOevI4uQ2HtOXUji8ytj6n4uwKrSt6HpcUA8AorseY/view#gid=0", params) }
            }

            else if (command === "website") {
                if (channel != null) { bot.postMessageToChannel(channel.name, "7308 Website:\nhttp://7308deepvision.com", params) }
                else { bot.postMessageToUser(user.name, "7308 Website:\nhttp://7308deepvision.com", params) }
            }

            else if (command === "github") {
                if (channel != null) { bot.postMessageToChannel(channel.name, "7308 GitHub:\nhttps://github.com/DeepVisionFRC", params) }
                else { bot.postMessageToUser(user.name, "7308 GitHub:\nhttps://github.com/DeepVisionFRC", params) }
            }

        }
    }
});