class King
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'King'
        this.paternMove = [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ]
        this.paternAttack = [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ]
    }

    matriceMove()
    {
        return this.paternMove
    }

    matriceAttack()
    {
        return this.paternAttack
    }
}

module.exports =  {
	King
}