var SlackBot = require('slackbots');
 
var bot = new SlackBot({
    token: '',
    name: 'DeepVisionBot'
});
 
var params = {
    icon_emoji: ':robot_face:'
};

var prefix = "dv8 ";

bot.on('message', async function(data) {
    if (data.subtype === "bot_message") return;

    if (data.type === "message") {
        var requireprefix = true;

        try { var channel = await bot.getChannelById(data.channel) }
        catch(err) {
            var channel = null;
            requireprefix = false;
        }

        var usedprefix = false;
        if (data.text.substring(0, prefix.length).toLowerCase() === prefix) usedprefix = true;

        if (usedprefix || !requireprefix) {
            var text = "Invalid command. Say `" + prefix + "help` for help."

            var command = data.text.substring(prefix.length, data.text.length);
            if (!usedprefix) {
                command = data.text.substring(0, data.text.length);
            }
            var user = await bot.getUserById(data.user);

            if (command === "help") {
                if (channel != null) { bot.postMessageToChannel(channel.name, "<@" + user.id +">, Sent you a direct message with information", params) }
                bot.postMessageToUser(user.name, "*Bot Information*:\n\n*Prefix:*\n" + prefix + "- To use a command, say \"" + prefix + "[command]\"\nNote: you do not have to use the prefix in direct message channels.\n\n*Commands:*\nhelp - gives information on how to use the bot.\nschedule - gives a link to our season schedule.\nwebsite - gives a link to our website.\ngithub - gives a link to our github group.\nkickoff - gives information on the FRC 2018 kickoff.\nonepager - Gives a link to our team's one-pager.", params);
            } else {
                if (command === "schedule") text = "7308 Season Schedule:\nhttps://docs.google.com/spreadsheets/d/1CCOevI4uQ2HtOXUji8ytj6n4uwKrSt6HpcUA8AorseY/view#gid=0";

                else if (command === "website") text = "7308 Website:\nhttp://7308deepvision.com";

                else if (command === "github") text = "7308 GitHub:\nhttps://github.com/DeepVisionFRC";

                else if (command === "kickoff") text = "*January 6th Kickoff Schedule:*\n\n6:45 -7:30          Team registration & Welcome\n7:30 - 8               Simulcast of game reveal\n8 – 8:30              Kit distribution & FIRST presentation\n8:30 - 9               Kit of parts inventory by each team\n9 - 11                  Rule summary and brainstorming\n11 - 11:30          Fun challenge\n11:30 - 12:30     Social lunch\n12:30 - 5:30       Rookie build session\n\n\nSunPower Corporation\n1414 Harbour Way S\nRichmond, CA 94804";

                else if (command === "onepager") text = "7308 DeepVision one-pager:\nhttps://docs.google.com/document/d/1SqG1Y8vkIlvZZXuYCJu8Amz3M0W2BdIM0nm6RpSVxbs/edit";

                if (channel != null) { bot.postMessageToChannel(channel.name, text, params) }
                else { bot.postMessageToUser(user.name, text, params) }
            }

            console.log(user.name + " used command \""+ command + "\"");

        }
    }
});