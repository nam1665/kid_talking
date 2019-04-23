// ArtyomCommands.js
export default class ArtyomCommandsManager {

    // The ArtyomCommandsManager class expects as argument in the constructor
    // an already declared instance of Artyom.js
    constructor (ArtyomInstance){
        this._artyom = ArtyomInstance;
    }

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    loadCommands(){
        let Artyom = this._artyom;

        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["Good Bye"],
                action: () => {
                    Artyom.say("Bye bye");
                }
            },
            {
                indexes: ["What's the weather today"],
                action: () => {
                    Artyom.say("It's a sunny day, but it's irrelevant to our lesson. Please ask something about Domestic Object");
                }
            },
            {
                indexes: ["What is your name"],
                action: () => {
                    Artyom.say("My name is Topi, I will guide you today");
                }
            },
        ]);
    }
}
