class Rook
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'Rook'
        this.paternMove = [
            [0,8,0],
            [8,0,8],
            [0,8,0]
        ]
        this.paternAttack = [
            [0,8,0],
            [8,0,8],
            [0,8,0]
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
	Rook
}