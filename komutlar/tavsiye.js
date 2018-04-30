const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(message.author.username +' Tavsiyen İçin Sana Çok Tavsiye Ederiz\n\nGereksiz Kullanımın Cezası Vardır.')
.setColor("RANDOM")
client.channels.get("439843991014473739").sendMessage(`= Tavsiyede Bulunan =\n\n${message.author.username}#${message.author.discriminator}\n\n= Tavsiyesi = \n\n ${mesaj}`)
return message.channel.sendEmbed(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tavsiye"],
  permLevel: 0
};

exports.help = {
  name: 'tavsiye',
  description: 'Yapımcıya tavsiye yollarsınız.',
  usage: 'tavsiye <tavsiyeniz>'
};
