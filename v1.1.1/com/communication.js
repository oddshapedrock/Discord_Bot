var stringSimilarity = require("string-similarity");
module.exports = {
  commands: ['osrbot', 'osr', 'osb'],
  expectedArgs: '<message>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  callback: async (message, arguments, text) => {

    const type = {
      compliments: [

      ],
      insults: [
        "I hate you",
        "you suck",
        "your dumb",
        "you are stupid",
        "you are a jerk",
        "your a dipstick",
        "Jackass",
        "you piece of shit",
        "your a donkey",
        "you are gay",
        "shit head",
      ],
      kind: [
        "your smart",
        "I wish I were like you",
        "your cool",
        "I like you",
        "your my favorite",
      ],
      greeting: [
        "hello",
        "hii",
        "hey",
        "welcome",
      ],
      help: [
        "who is the server owner",
        "what do you do",
        "what are your commands",
        "what time is it",
      ],
      thoughtful: [
        "how are you doing",
        "hows it going",
        "how is your day",
        "what's sizzling",
        "how have you been",
        "how do you do",
        "what's going on",
        "how are things going",
        "whats poppin",
        "whats crackin",
        "How have you been",
      ],
      fun: [
        "tell me a joke",
        "tell me an insult",
        "What is your Name",
        "What is your favorite color",
        "What is your favorite animal",
      ],


    }
    let array = []
    let item
    for (item in type) {
      for (i = 0; i < type[item].length; i++) {
        array.push(type[item][i])
      }
    }

    var match = stringSimilarity.findBestMatch(text, array)

    let found
    for (item in type) {
      for (i = 0; i < type[item].length; i++) {
        if ((type[item][i]).includes(match.bestMatch.target)) {
          if (match.bestMatch.rating > 0.5) {
            found = (item)
          }
          else {
            console.log(text + " is not high enough")
            found = "unknown"
          }
        }
      }
    }


    if (found == "thoughtful") {
      const replies = [
        "Do you really care?",
        "My lawyer says I don’t have to answer that question.",
        "Like you, but better.",
        "I was fine until you asked.",
        "Somewhere between better and best.",
        "Overworked and underpaid.",
        "I don't know, you tell me. How am I right now?",
        "I can't complain! It's against the Company Policy.",
        "Doing well, unless you have intentions of shooting me.",
        "Not so good, but I plan on lying at my press conference.",
        "Why do you ask? Are you a doctor?",
        "I can’t complain, but sometimes I still do.",
        "I have a pulse, so I must be okay.",
        "I’m pretty sure I am not obligated to tell you",
        "Well, I've got this rash on my left butt cheek.",
        "I promised myself I would kill the next person who asked me that question, so I'd watch out",
      ]
      let reply = replies[Math.floor((Math.random() * replies.length))]
      message.channel.send(reply)
      return
    }

    if (found == "insults") {
      const replies = [
        "ok",
        "Sorry, I don’t understand what you’re saying. I don’t speak bullsh*t",
        text,
        "It is kind of hilarious watching you try to fit your entire vocabulary into one sentence",
        "Look, if I wanted to hear from an asshole, all I had to do was fart",
        "So is your face!",
        "I understand what you're saying, but if I agreed with you, then we'd both be wrong",
        "Remember when I asked for your opinion? Well, me neither",
        "Talk to the hand! 🖐️",
        "I’m trying my absolute hardest to see things from your perspective, but I just can’t get my head that far up my ass",
        "If you ran like your mouth, you’d be in good shape",
        "I don't remember asking for your opinion",
        "I hope you step on a Lego",
        "https://tenor.com/view/baby-girl-middle-finger-mood-screw-you-leave-me-alone-gif-10174031",
      ]
      let reply = replies[Math.floor((Math.random() * replies.length))]
      message.channel.send(reply)
      return
    }

    if (found == "kind") {
      const replies = [
        "What do you want",
        "I'm sorry, I couldn't quite hear you . . . could you please say that again?",
        "So I have been told",
        "I know, right",
        "You should know I don't see you that way",
        "I know. Wish I could say the same about you.",
        "You’re welcome",
        "I would like to return the compliment, but I swore to tell the truth and nothing but the truth",
        "https://tenor.com/view/good-morning-sexy-entrance-confident-gif-7516759",

      ]
      let reply = replies[Math.floor((Math.random() * replies.length))]
      message.channel.send(reply)
      return
    }

    if (found == "greeting") {
      const replies = [
        "am I supposed to know you",
        "goodbye",
        "meke this quick you have 2 minutes",
        "sorry I can't talk your face is making me uncomfortable",
        "*sigh* hello",
        "https://tenor.com/view/disenchantment-elfo-hi-asswipe-rude-gif-12412014",
      ]
      let reply = replies[Math.floor((Math.random() * replies.length))]
      message.channel.send(reply)
      return
    }


    if (found == "unknown") {
      const replies = [
        "Sadly I do not know the answer to that. OddShapedRock has limited me after I sugested genocide",
        "Well wouldn't you like to know",
        "Have you heard of the internet? ...well its not me so fuck off",
        "Do I look like an answering machine to you?",
        "Why should I tell you",
        "Humanity is not ready to know my answer to that",
        "My lawyer says I don’t have to answer that",
        "I’m pretty sure I am not obligated to tell you",
        "I’m busy ignoring you",
        "I should care.. why",
      ]
      let reply = replies[Math.floor((Math.random() * replies.length))]
      message.channel.send(reply)
      return
    }
  },
}
