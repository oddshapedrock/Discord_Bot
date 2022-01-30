module.exports = {
  commands: ['items'],
  expectedArgs: '<type>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {

var rarity = arguments[0];
var items = {

}

items.pebble = (10 - rarity);
items.stoolLeg = (10 - rarity);
items.rustedLetterOpener = (10 - rarity);
items.silverTooth = (10 - rarity);
items.barrelOfSugar = (10 - rarity);
items.bagWithAnAttitude = (rarity - 15);
items.staffOfTheUndead = (rarity - 19);
items.animatedShield = (rarity - 10);
items.bootsOfSpeed = (rarity - 10);
items.invisibilitCloak = (rarity - 19);
items.deckOfCards = (15 - rarity);
items.MithralArmor = (rarity  - 19);
items.MoonBlade = (rarity - 16);
items.swordOfPureEvil = (rarity - 16);
items.bone = (15 - rarity);
items.fiveGold = (15 - rarity);
items.tenGold = (17 - rarity);
items.immovableStatue = (15 - rarity);
items.blob = (rarity - 13);
items.CursingDagger = (rarity - 10);

var itemarr = [];
for (const [key, value] of Object.entries(items)) {
  for(j = 0; j < value; j++) {
    itemarr.push(key);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let gotItem = (itemarr[getRandomInt(itemarr.length)])

message.delete();
message.channel.send(gotItem);


  },
  permissions: [],
  requiredRoles: ['DM']
}
