const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'kayıtsız',
    aliases: ['kayıtsız', 'unreg', 'unregister'],

    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Solve?');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor.").setFooter(`Solve?`))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Lütfen Bir Kullanıcı Etiketle").setFooter(`Solve?`))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!").setFooter(`Solve?`))
        }
        await message.guild.members.cache.get(member.id).roles.set(client.config.unregisteres)
        message.channel.send(embed.setDescription("Kullanıcı Kayıtsız Kısmına Atıldı.").setFooter(`Solve?`))
        db.delete(`kayıt_${member.id}`)

    }
}
