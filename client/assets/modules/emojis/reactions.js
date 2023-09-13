class Reactions
{ 
    constructor(emojiPanel) 
    {
        this.socket = io.connect(':8090');
        this.emojiPanel = emojiPanel
        this.focusedMessageId = false;
        this.emojis = false;
        this.start()
    }

    start()
    {   
        this.socket.emit('getEmojis');
        this.socket.on('allEmojis', (data) => 
        {
            this.setEmojis(data);
            this.injectEmojis();
        });
        this.socket.on('reactionAdded', (data) => this.showReactions(data));
    }

    setMessagesBtn(messagesBtn) 
    {
        return this.messagesBtn = messagesBtn
    }

    setFocusedMessageId(messageId) 
    {
        return this.focusedMessageId = messageId
    }

    setEmojis(data) 
    {    
        return this.emojis = data  
    }
    
    injectEmojis() 
    {
        this.emojiPanel.innerHTML = this.emojis.map((emoji) => `
            <li>
                <button class="emoji" data-utf="${emoji.codes}">${emoji.emoji}</button>
            </li>
        `).join('')      
    }

    showReactions(data) 
    {
        const emojiIdx = this.emojis.findIndex((emoji) => emoji.codes === data.emojiCode);
        document.querySelector(`[data-id="${data.messageId}"] > .reactions`).innerHTML += `
            <div class="reaction">
                <span>${this.emojis[emojiIdx].emoji}</span>
                <span >${data.user}</span>
            </div>
        `
    }

    sendReaction(messageButton) 
    {
        this.setFocusedMessageId(messageButton.parentElement.getAttribute('data-id'));
        this.emojiPanel.classList.add('show')

        this.emojiPanel.querySelectorAll('.emoji').forEach((emoji) =>
            emoji.addEventListener('click', () => 
            { 
                if (this.focusedMessageId) 
                {
                    const emojiCode = emoji.getAttribute('data-utf')
                    socket.emit("addReactionToMessage", {messageId: this.focusedMessageId, emojiCode})
                    this.removeReactionPanel()
                }
            })
        )
    }

    removeReactionPanel() 
    {
	    this.emojiPanel.classList.remove('show')
	    this.setFocusedMessageId(false)
    }
}