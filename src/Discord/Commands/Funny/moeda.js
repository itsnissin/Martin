const { random } = require("../../../Modules/Utils/random.js");

module.exports = {
  name: "cc",
  description: "Jogue uma moeda e veja em qual lado cai.",
  category: "funny",
  repairing: false,
  
  async run(client, message, args) {
    const number = random(1, 100);
    const alternatives = [{ name: "cara", chance: 50 }, { name: "coroa", chance: 100 }];
    
    function drawPool(pool) {
      return pool.find((item) => number <= item.chance);
    }

    const result = drawPool(alternatives);

    message.reply(`🪙 A moeda caiu em **${result.name}**!`);
  },
};
