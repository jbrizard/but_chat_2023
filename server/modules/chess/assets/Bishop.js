class Bishop
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'Bishop'
        this.paternMove = [
            [8,0,8],
            [0,0,0],
            [8,0,8]
        ]
        this.paternAttack = [
            [8,0,8],
            [0,0,0],
            [8,0,8]
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
	Bishop
}
