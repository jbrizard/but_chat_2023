class Pawn
{ 
    constructor(team, id) 
    {
        this.team = team
        this.id = id
        this.type = 'Pawn'
        this.firstDisplacement = true
        this.paternMove = [
            [0,1,0],
            [0,0,0],
            [0,0,0]
        ]
        this.paternAttack = [
            [1,0,1],
            [0,0,0],
            [0,0,0]
        ]
    }

    firstDisplacementCompleted()
    {
        this.firstDisplacement = false
    }

    matriceMove()
    {
        if (this.firstDisplacement === true) {
            return [
                [0,2,0],
                [0,0,0],
                [0,0,0]
            ]
        }
        else {
            return this.paternMove
        }
    }

    matriceAttack()
    {
        return this.paternAttack
    }
}

module.exports =  {
	Pawn
}