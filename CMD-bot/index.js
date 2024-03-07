// constuctors (gebeurd 1 keer als je de code opstart)
// dit zorgt ervoor dat de bot meerdere dingen van de code kan verstaan en kan laten werken, zoals de weer functie
const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./assets/settings.json');
const weather = require("weather-js");

// client ready
client.on("ready", () => {
    console.log("CMDbot = online");
    client.user.setActivity("use >commands");
});

// commandhandeler
// Wat hier gebeurt is dat alles wat wordt getypt na de prefix (>)  wordt netjes uit elkaar gehaald en in lower case gezet zodat de bot het makkelijker kan lezen
client.on("message", (message) => {

    // Hier word gecontroleerd op 2 dingen, eerst het bericht van de bot. En heeft het bericht de prefix er niet in staan. Dan stopt de functie.
    if (message.author.bot) return;
    if (message.content.indexOf(settings.prefix) !== 0) return;
    
    // Als dat niet het geval is, dan haalt hij het bericht uit elkaar. En splitst hij het op naar 2 dingen, de argumenten en de command
    // en die worden naar lowercase gezet zodat alle manieren van typen werken
    // Die commands en argumenten gebruik je dan verder in je code om je bot aan te sturen
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // commandlijst
    if (command === "commands") {
        // hier maakt het een embed met een field waarin de commands staat
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("List of commands")
    .setColor("#c6002a")
    .addField(">commands", "a list of commands for you to use")
    .addField(">botinfo", "some information about the CMDbot")
    .addField(">kick", "use this to kick annoying people")
    .addField(">hey" ,"have a nice conversation with the CMDbot")
    .addField(">feit", "RANDOM FACT OF THE DAY")
    .addField(">rooster", "get your rooster for the week")
    .addField(">meme", "free memes for everybody provided by @CMDAVANS")
    .addField(">weer", "get the weather from every city in the world")
    return message.channel.send(helpEmbed);
    }

    // botinfo  (deze command laat informatie over de bot zien)
    if (command === "botinfo") {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("About Me")
    .setColor("#c6002a")
    .setThumbnail(bicon)
    .addField("Name", client.user.username)
    .addField("Started on", client.user.createdAt);
    return message.channel.send(botembed);
    // de .addfields zijn de gegevens die hij laat zien en die haalt de bot uit de discord-js npm
    }


    // heycommand  (deze command reageert puur op )
    if (command === "hey") {
        message.channel.send("hey maatje!")
    }

    if (command === "feit") {
        number = 3;
        var random = Math.floor (Math.random() * (number -1 + 1)) + 1;
        switch (random) {
            case 1: message.channel.send("feit van de dag: May is een lekkerding"); break;
            case 2: message.channel.send("feit van de dag: May gaat deze toets halen"); break;
            case 3: message.channel.send("feit van de dag: May gaat vandaag geen tikkie sturen"); break;

            // de break om het einde zorgt ervoor dat de code opnieuw kan worden gerunt

        }
    }

    
    // kickcommand
    if (command === "kick") {

        if(!message.member.roles.find(r => r.name === "ADMIN")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS');

        // hier kijkt de bot naar wie je hebt getagd en de reden(arugments) ervoor, daarna kickt die de persoon die is getagt
        let member = message.mentions.member.first();
        let reason = args.slice(1).join(" ");
        member.kick(reason);
    }

    // rooster command (prototype, dit is puur ter illustratie om te laten zien hoe het uiteindelijk eruit zou moeten zien )
    if (command === "rooster") {
        message.channel.send({files: ["./images/rooster1.png"]});
    }

    // meme command
    if (command === "meme") {
        // wat je hier ziet is dat de bot een random nummer krijgt door de formule, en het nummer dat eruit komt is de case die wordt afgespeelt
        number = 7;
        var random = Math.floor (Math.random() * (number -1 + 1)) + 1;
        switch (random) {
            //  hij zoekt nu in de files naar het mapje "images" en vanuit daar pakt hij een van de fotos
            case 1: message.channel.send("meme made by ig: cmdavans",{files: ["./images/meme1.png"]}); break;
            case 2: message.channel.send("meme mady by ig: cmdavans", {files: ["./images/meme2.png"]}); break;
            case 3: message.channel.send("meme mady by ig: cmdavans", {files: ["./images/meme3.png"]}); break;
            case 4: message.channel.send("meme mady by ig: cmdavans", {files: ["./images/meme4.png"]}); break;
            case 5: message.channel.send("meme mady by ig: cmdavans",{files: ["./images/meme5.png"]}); break;
            case 6: message.channel.send("meme mady by ig: cmdavans", {files: ["./images/meme6.png"]}); break;
            case 7: message.channel.send("meme made by ig: cmdavans", {files: ["./images/meme7.png"]}); break;
            // de break om het einde zorgt ervoor dat de code opnieuw kan worden gerunt
        }
    }

    if (command ==="weer") {

        // dit stuk zoekt naar argumenten die de bot omzet naar granden celcius
        weather.find({search: args[0], degreeType: 'C'}, function(err, result){ 
            if (err) message.channel.send(err);

        // dit stuk is voor wanneer ze geen geldige stad intypen
            if (result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**') 
            return; // dit zorgt ervoor de rest van de code niet runt als ze iets fout intypen.
        }

        // Variables
        var current = result[0].current; //  dit is een variable voor de huidig tijd van de JSON output
        var location = result[0].location; // dit is een variable voor de loctatie van de JSON output

        // dit is een embed om de gegevens netter te laten zien.
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`) // dit is de tekst over hoe de lucht eruit ziet (regen, zonnig etc)
            .setAuthor(`Weather for ${current.observationpoint}`) // dit laat de locatie van het weer zien
            .setThumbnail(current.imageUrl) // dit veranderd het plaatje van de embed
            .setColor("#c6002a") // dit veranderd de kleur van de streep naast de embed
            .addField('Timezone',`UTC${location.timezone}`, true) 
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            // de .addfields zijn de gegevens die hij laat zien en die haalt de bot uit de weather-js npm

            // dit zorgt ervoor dat de embed wordt gestuurd als je naar het weer vraagt
            message.channel.send({embed});
        });
    }

});

client.login(settings.token);