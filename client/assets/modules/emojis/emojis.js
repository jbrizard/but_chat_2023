class EmojisManager
{ 
    constructor() 
    {
        this.socket = io.connect(':8090')
        this.emojis = false;
        this.getEmojisDataBase()
    }

    getEmojisDataBase()
    {
        this.socket.emit('getEmojisDataBase');

        this.socket.on('getEmojisDataBase', ({data}) => 
        {
            this.emojis = data
        });
    }

    getEmojis()
    {
        return this.emojis
    }

    searchEmojis(message)
    {
        const regex = /:[^:]+:/g;
        const matchs = message.match(regex);

        const realEmojis = matchs ? matchs.map((match) => {
            let indexFound = this.emojis.findIndex((element) => element.char === match)
            if (indexFound !== -1) return { 
                match,
                emoji: this.emojis[indexFound].emoji
            }
            return null
        }) : null

        return realEmojis
    }

    setEmojisInMessage(message)
    {
        let data = this.searchEmojis(message)
        let newMessage = message
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if (data[index]) 
                    newMessage = message.replaceAll(data[index].match, data[index].emoji)
            }
        }

        return newMessage
    }

}