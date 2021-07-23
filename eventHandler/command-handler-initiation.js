const fs = require('fs');
const path = require('path')

module.exports = (client, Discord) => {
  client.on('ready', () => {
    //keep used for the command handler
    const baseFile = 'command-handler.js'
    const commandBase = require(`../com/${baseFile}`)
    const logAll = []

    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommand(path.join(dir, file))
        }
        else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          logAll.push(option)
        }
      }
      commandBase(client, logAll)
    }

    readCommands('../com')
  })
}
