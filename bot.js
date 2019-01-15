// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTM0MDQzMDIyNjU3MTkxOTQ2.Dxz2Aw.WwtC8sP8RtQImotsN85duCtvEf4";

client.login(token)


var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_25FCE88B958AF558E7E46ED38C7C90B86752B57F2BB702B842CFE19FC4B449232E94464546F81AD2E6BD7304DFEA2D69F879EC2409B6A97FD01D028654A4DF4EEF2016E14F21E275B6645485B352FB685E0B7C8320E47679E1581061CC8AC69888020AA638D1AF27532D1C9F2D6AFF3D634407FA5B5E757052D6D61FE9292168ADACA600A3799244C5ECC07E75CCF992109E399553847C436C9F9E37FB7E3A8CF9503B6FD384788E3D9C1A0AF0836400D6A9397BF68E8FEE6733EA1F1722F49B155BFD21E9BB7632EF9DA1C42D5C6B08263754B63AC3626B4898F97A2BA96BAFFD146664083219AC57268090A6250F80B87B87E944131D772198CF4F77E6AA0FB1389B1D10611DBBC2DB10085F90C6F6793B2A990B0BA55525829601AF3437E8BEB523B3DB71B2A68A568837D164C1E8AF1BD1A13A1E4B0CE2476D12D9096F1113CDB7BD";
var prefix = '!';
var groupId = 2789803;
var maximumRank = 255;

function login() {
return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Hr"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})