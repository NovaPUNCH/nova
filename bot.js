const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('guildBanAdd' , (guild, user) => {
  let aramızakatılanlar = guild.channels.find('name', 'aramıza-katılanlar');
  if (!aramızakatılanlar) return;
  aramızakatılanlar.send('https://media.giphy.com/media/8njotXALXXNrW/giphy.gif **Adalet dağıtma zamanı gelmiş!** '+ user.username +'**Bakıyorum da suç işlemiş,Yargı dağıtmaya devam** :fist: :writing_hand:  :spy:' );
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', message => {
  if (message.content.toLowerCase() === 'sa') {
      message.reply('Aleyküm Selam Hoşgeldin !');
}
if (message.content.toLowerCase() === 'mal osman') {
    message.reply('Kime Mal Diyon Amık Orospusu');
  }
  if (message.content.toLowerCase() === 'instagram') {
    message.reply('osivrikaya');
  }
  if (message.content.toLowerCase() === 'bb') {
    message.reply('Hoşçakal');
  }
  if (!message.content.startsWith(prefix)) {
     return;
}
if (message.content.toLowerCase() === prefix + 'yapımcı') {
message.reply('OsmanSivrikaya')
}
  if (!message.content.startsWith(prefix)) {
     return;
}
if (message.content.toLowerCase() === prefix + 'top') {
message.reply('Nicat')
}
  if (!message.content.startsWith(prefix)) {
     return;
}
if (message.content.toLowerCase() === prefix + 'kedi') {
message.reply('https://imgrosetta.mynet.com.tr/file/400653/400653-728xauto.jpg')
}
if (!message.content.startsWith(prefix)) {
   return;
}
if (message.content.toLowerCase() === prefix + 'herkesebendençay') {
message.reply('https://www.memurlar.net/common/news/images/817212/headline.jpg')
}
if (message.content.toLowerCase() === prefix + 'ping') {
message.reply('Pinginiz ' + client.ping + 'ms')
}
if (message.content === prefix + 'reboot') {
    if (message.author.id === '310351659156897803') {
        message.channel.send('[BOT] yeniden başlatılıyor!!').then (msg => {
            console.log('[BOT]yeniden başlatılıyor!');
        process.exit(0);
        });
    }else {
        message.channel.send('Bu Yetkiye Sahip Değilsin!');
    }

}




});

client.on("guildMemberAdd", member => {

   var channel = member.guild.channels.find("name", "aramızakatılanlar");
   if(!channel) return;

   var role = member.guild.roles.find("name", "üye");
   if(!role) return;

   member.addRole(role);
   channel.send(member + "Artık" + role + "rölü ile aramızda");
   member.send("Aramıza hoşgeldin! Artık üye rolüne sahipsin!")
});


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
