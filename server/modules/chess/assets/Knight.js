class Knight
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'Knight'
        this.paternMove = [
            [0,1,0,1,0],
            [1,0,0,0,1],
            [0,0,0,0,0],
            [1,0,0,0,1],
            [0,1,0,1,0],
        ]
        this.paternAttack = [
            [0,1,0,1,0],
            [1,0,0,0,1],
            [0,0,0,0,0],
            [1,0,0,0,1],
            [0,1,0,1,0],
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
	Knight
}