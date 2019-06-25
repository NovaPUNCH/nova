const Discord = require('discord.js');


exports.run = function(client, message, args) {
  const sayi = args.slice(0).join(' ');

  if(sayi.length < 1) {
    return message.reply("Silmem için bir sayı belirt!!")
  } else {
       message.channel.bulkDelete(sayi + 1);
    message.channel.send("**" + sayi + "** adet mesaj silindi!").then(msg =>{
        message.delete("5000")
      });
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'temizle',
  description: 'Belirtilen miktarda sayı siler',
  usage: 'temizle <miktar>'
};
