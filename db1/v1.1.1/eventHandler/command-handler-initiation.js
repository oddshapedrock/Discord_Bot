const fs = require('fs');
const path = require('path')

module.exports = (client, Discord) => {
  client.on('ready', () => {
    const baseFile = 'command-handler.js' //file to act as command handler
    const commandBase = require(`../com/${baseFile}`) //getting module.exports from the command handler
    let logAll = [] //FIXME use let instead of const
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        }
        else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          logAll.push(option)
        }
      }
      commandBase(client, logAll, Discord)
    }
    readCommands('../com')
  })
}
