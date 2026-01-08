module.exports = {
  name: "ping",
  description: "Mostra o ping do bot e tempo online.",
  aliases: ["latência", "p"],
  category: "util",
  repairing: false,
  
  async run(client, message, args) {
    const ping = client.ws.ping;
    const uptime = Math.trunc((Date.now() - client.uptime) / 1000);
    
    message.reply(`# <:informacoes:1329057211154038795> . Informações
📡 **Ping:**
- _\`${ping}ms\`_
⏰ **Uptime:**
- _<t:${uptime}:R>_`);
  },
};
