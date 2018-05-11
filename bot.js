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
client.on("message", message => {
  const dmchannel = client.channels.find("id", "443761073443831809");
if (message.channel.type === "dm") {
 const embed = new Discord.RichEmbed()
    if (message.author.id === client.user.id) return;
    dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Bana dm mesaj atıldı.`,
              description: `Dm'yi atan: ${message.author.tag}\n\nDm mesaj: ${message.content}`
            }})
           }})
client.on('guildCreate', guild => {

const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Sunucuya katıldım;')
.setDescription(`${guild.name} adlı sunucuya eklendim \n[${guild.memberCount} üye]!\n[${guild.id}]\nSunucu sahibi: ${guild.owner}(${guild.owner.id})`)
.setFooter('Rahatsız Bot', client.user.avatarURL)
.setTimestamp()
client.channels.get('443761073443831809').send(embed);
});

client.on('guildDelete', guild => {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Sunucudan atıldım;')
.setDescription(`${guild.name} adlı sunucudan atıldım \n[${guild.memberCount} üye]!\n[${guild.id}]`)
.setFooter('Rahatsız Bot', client.user.avatarURL)
.setTimestamp()
client.channels.get('443761073443831809').send(embed);
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) {
    console.log(`[${msg.author.tag}]  : ${msg.content}`);
    return;
  }
});

client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
  }
  });

;

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

client.on('guildMemberAdd', member => {
  const hg = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .setDescription(`** ${member.guild.name} Sunucusuna Hoşgeldin ${member.user.username}**`)
  .setFooter(`© Rahatsız Bot`)
  .setTimestamp()
  .setColor('RANDOM')
  member.send(hg);
});

client.on('guildMemberRemove', member => {
  const bb = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .setDescription(`** ${member.guild.name} Görüşmek Üzere ${member.user.username}** :wave:`)
  .setFooter(`© Rahatsız Bot`)
  .setTimestamp()
  .setColor('RANDOM')
  member.send(bb);
});

client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find(r => r.name.startsWith('Üye')));
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return member.guild.createChannel('giriş-çıkış');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye katıldı;')
 .setDescription(`Sunucuya katıldı [${member.guild.memberCount} üye]!`)
 .setFooter('giriş-çıkış', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return member.guild.createChannel('giriş-çıkış');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye ayrıldı;')
 .setDescription(`Sunucudan ayrıldı [${member.guild.memberCount} üye]!`)
 .setFooter('giriş-çıkış', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(total)
    message.channel.send({embed});
    message.react('✅')
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(total)
    message.channel.send({embed});
    message.react('✅')
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(total)
    message.channel.send({embed});
    message.react('✅')
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(total)
    message.channel.send({embed});
    message.react('✅')
  }
});

client.login(ayarlar.token);
