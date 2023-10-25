class Queen
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'Queen'
        this.paternMove = [
            [8,8,8],
            [8,0,8],
            [8,8,8]
        ]
        this.paternAttack = [
            [8,8,8],
            [8,0,8],
            [8,8,8]
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
	Queen
}