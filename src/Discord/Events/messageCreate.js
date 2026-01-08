const config = require("../../Utils/config.json");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    let prefix = config.prefix;

    if (!prefix) {
      console.error(`Prefixo não encontrado para o guild ${guildId}`);
      return;
    }

    if (message.content.replace(`${prefix}`, "") === `<@${client.user.id}>`) {
      return message.reply(`Oi, meu prefixo é **${prefix}**`);
    }

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();
    const cmd = client.commands.find(
      (c) => c.name === command || (c.aliases && c.aliases.includes(command))
    );

    if (cmd) {
      if (cmd.devOnly && !client.developers.includes(message.author.id)) {
        return message.reply(
          `**( <:x_:1296573341255209042> ) -** Este comando é restrito aos desenvolvedores!`
        );
      }

      if (cmd.repairing && !client.developers.includes(message.author.id)) {
        return message.reply(
          `**( <:x_:1296573341255209042> ) -** Este comando está em manutenção!`
        );
      }
    }

    if (!cmd) return;

    try {
      cmd.run(client, message, args);
    } catch (err) {
      console.log(err);
    }
  },
};