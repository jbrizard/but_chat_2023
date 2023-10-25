class ChessChat 
{
    constructor (modal, socket, userName) 
    {
        this.socket = io.connect(':8090');
        this.activeUsers = false
        this.userListModal = modal;
        this.socket = socket
        this.userName = userName
        this.start();
    }

    start()
    {
        socket.on('active_users', (users) =>  
        {
            this.setActiveUsers(users);
            this.injectUser()
        })
        socket.on('chess_invitation', (sender) => this.gotInvited(sender));
        socket.on('chess_game_prepared', (url) => this.disconnectAndGoToTheRoom(url));
    }

    setActiveUsers(users)
    {
        return this.activeUsers = users
    }

    injectUser()
    {
        this.userListModal.innerHTML = (this.activeUsers ?? []).map((user) => user.name !== this.userName 
        ? `
            <li>
                <button data-id="${user.id}">${user.name}</button>
            </li>
        ` : "").join('');

        this.userListModal.querySelectorAll('button').forEach((btn, index) => {
            btn.addEventListener('click', () => 
                socket.emit('chess_game', btn.getAttribute('data-id'))
            )
        })
    }

    stringAnalyse(string) 
    {
        string.includes('/chess')
            ? this.userListModal.classList.remove('hide')
            : !this.userListModal.classList.contains('hide') 
                ? this.userListModal.classList.add('hide') 
                : ""
	}

    gotInvited(sender)
    {
        $('body').append(`
            <aside class="chess_invitation">
                <div>
                    <h2>Chess game</h2>
                    <p><b>${sender.name}</b> t'as invité à un jeu d'echec</p>
                    <div>
                        <button>Accepté</button>
                        <button>Refusé</button>
                    </div>
                </div>
            </aside>
        `)
        
        // document.body.innerHTML += `
        //     <aside class="chess_invitation">
        //         <div>
        //             <h2>Chess game</h2>
        //             <p><b>${sender.name}</b> t'as invité à un jeu d'echec</p>
        //             <div>
        //                 <button>Accepté</button>
        //                 <button>Refusé</button>
        //             </div>
        //         </div>
        //     </aside>
        // `;

        document.querySelectorAll('.chess_invitation button').forEach((btn, index) => 
            btn.addEventListener('click', () => 
                index === 0 ? socket.emit('chess_game_start', {id: sender.id, name: sender.name}) : this.removeChessInvitationModal()
            )    
        );
       
    }

    removeChessInvitationModal()
    {
        $('.chess_invitation').remove();
    }

    disconnectAndGoToTheRoom(url) {
        document.cookie = `id=${this.socket.id}`;
        document.cookie += `&&name=${this.userName}`;
        socket.disconnect();
        window.location.href = url
    }

}