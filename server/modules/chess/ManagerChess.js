var {Bishop} = require('./assets/Bishop.js');
var {King} = require('./assets/King.js');
var {Knight} = require('./assets/Knight.js');
var {Pawn} = require('./assets/Pawn.js');
var {Queen} = require('./assets/Queen.js');
var {Rook} = require('./assets/Rook.js');

class ManagerChess
{ 
    constructor() 
    {
        this.letters = ['A','B','C','D','E','F','G','H']
        this.numbers = ['1','2','3','4','5','6','7','8']
        // case du chessboard
        this.chessboard = [
            ['A1','A2','A3','A4','A5','A6','A7','A8'],
            ['B1','B2','B3','B4','B5','B6','B7','B8'],
            ['C1','C2','C3','C4','C5','C6','C7','C8'],
            ['D1','D2','D3','D4','D5','D6','D7','D8'],
            ['E1','E2','E3','E4','E5','E6','E7','E8'],
            ['F1','F2','F3','F4','F5','F6','F7','F8'],
            ['G1','G2','G3','G4','G5','G6','G7','G8'],
            ['H1','H2','H3','H4','H5','H6','H7','H8']
        ]

        // placement des pion sur le chessboard
        this.placement = 
        [
            [new Rook(2,1), new Knight(2,1), new Bishop(2,1), new Queen(2,1), new King(2,1), new Bishop(2,2), new Knight(2,2), new Rook(2,2)],
            [new Pawn(2,1), new Pawn(2,2), new Pawn(2,3), new Pawn(2,4), new Pawn(2,5), new Pawn(2,6), new Pawn(2,7), new Pawn(2,8)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(1,1), new Pawn(1,2), new Pawn(1,3), new Pawn(1,4), new Pawn(1,5), new Pawn(1,6), new Pawn(1,7), new Pawn(1,8)],
            [new Rook(1,1), new Knight(1,1), new Bishop(1,1), new Queen(1,1), new King(1,1), new Bishop(1,2), new Knight(1,2), new Rook(1,2)],
        ]
        // piece sélectionné
        this.pieceSelected = {
            type: null,
            placement: [],
            caseName: null,
            currentMovePossibilities : [],
            pieceObject: null
        }
        // tour du jeu
        this.turn = {
            team: 1, // Joueur qui doit jouer
            numero: 1
        }
    }

    // Fonction de lancement du jeu
    setupGame()
    {
        return { placement: this.placement, turn: this.turn }
    }

    // Function pour trouver la piece associé à la case associé
    indexOf2D(array2D, target) {
        for (let i = 0; i < array2D.length; i++) {
          const row = array2D[i];
          for (let j = 0; j < row.length; j++) {
            if (row[j] === target) {
              return [i, j];
            }
          }
        }
        return null;
    }

    // Function pour trouver les déplacement possible du chevalier
    getKnightMoves(row, col) {
        const possibleMoves = [];
      
        // Les mouvements possibles du cavalier en fonction de sa position actuelle
        const moves = [
          { row: -2, col: -1 }, // Déplacement en haut à gauche
          { row: -2, col: 1 },  // Déplacement en haut à droite
          { row: -1, col: -2 }, // Déplacement à gauche en haut
          { row: -1, col: 2 },  // Déplacement à droite en haut
          { row: 1, col: -2 },  // Déplacement à gauche en bas
          { row: 1, col: 2 },   // Déplacement à droite en bas
          { row: 2, col: -1 },  // Déplacement en bas à gauche
          { row: 2, col: 1 }    // Déplacement en bas à droite
        ];
      
        for (const move of moves) {
          const newRow = row + move.row;
          const newCol = col + move.col;
      
          // Vérifier si la nouvelle position est valide (dans les limites de l'échiquier 8x8)


          if (this.isValidMove([newRow, newCol])) {
            possibleMoves.push([newRow, newCol]);
          }
        }
      
        return possibleMoves;
    }

    // Function pour trouver l'index d'un tableau dans un tableau
    findSubarray(arr, subarray) {
        for (let i = 0; i < arr.length; i++) {
          const currentSubarray = arr[i];
          if (this.arraysAreEqual(currentSubarray, subarray)) {
            return i;
          }
        }
        return -1; // Retourne -1 si le tableau n'a pas été trouvé
      }
    // Function pour vérifier que 2 tableaux sont égaux
    arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }
        
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        
        return true;
      }


    // Function pour vérifier si les futures positions possible n'exéde pas la limite de case du chessboard
    isValidMove(possibility) {
        return possibility[0] >= 0 && possibility[0] < 8 && possibility[1] >= 0 && possibility[1] < 8;
    }

    // Function pour verifier et pousser la possibilté dans le tableau des possibilité de déplacement
    validAndExtendPossibilities (possibility) {
        if(this.isValidMove(possibility)) {
            this.pieceSelected.currentMovePossibilities.push(possibility)
        }
    }

    
    // Fonction pour rechercher les possibilité de déplacement d'une piéce sélectionné, les stocker et les récupérer
    getPieceMovePossibilities(caseName)
    {
        this.pieceSelected.currentMovePossibilities = []
        const [ligne0, colonne0] = this.indexOf2D(this.chessboard, caseName); // Obtient la ligne et la colone du nom de la case
        this.pieceSelected.placement = [ligne0, colonne0]
        this.pieceSelected.caseName = caseName

        if (this.placement[ligne0][colonne0]) {
            const piece = this.placement[ligne0][colonne0]
            let forward = this.turn.team === 1 ? -1 : 1;
            this.pieceSelected.type = piece.type
            this.pieceSelected.pieceObject = piece

            if (piece.type !== 'Knight') {

                const matriceMovePiece = piece.matriceMove()

                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {

                        if (matriceMovePiece[r][c] !== 0) {
                            for (let d = 1; d < matriceMovePiece[r][c] + 1; d++) {
                                if (r === 0) {
                                    if (c === 0) {
                                        this.validAndExtendPossibilities([ligne0 + (d*forward), colonne0 - d])
                                    }
                                    else if (c === 1) {
                                        this.validAndExtendPossibilities([ligne0 + (d*forward), colonne0])
                                    }
                                    else {
                                        this.validAndExtendPossibilities([ligne0 + (d*forward), colonne0 + d])
                                    }
                                }
                                else if (r === 1) {
                                    if (c === 0) {
                                        this.validAndExtendPossibilities([ligne0, colonne0 - d])
                                    }
                                    else if (c === 1) {
                                        // possibilities.push([ligne0, colonne0])
                                    }
                                    else {
                                        this.validAndExtendPossibilities([ligne0, colonne0 + d])
                                    }
                                }
                                else {
                                    if (c === 0) {
                                        this.validAndExtendPossibilities([ligne0 - (d*forward), colonne0 - d])
                                    }
                                    else if (c === 1) {
                                        this.validAndExtendPossibilities([ligne0 - (d*forward), colonne0])
                                    }
                                    else {
                                        this.validAndExtendPossibilities([ligne0 - (d*forward), colonne0 + d])
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Knight
            else {
                this.pieceSelected.currentMovePossibilities = this.getKnightMoves(ligne0, colonne0)
            }
        }
        return {currentMovePossibilities: this.pieceSelected.currentMovePossibilities, caseName: this.pieceSelected.caseName}
    }


    // Function pour bouger la piece
    pieceMovedTo(caseName)
    {
        const [ligne1, colonne1] = this.indexOf2D(this.chessboard, caseName);
        const index = this.findSubarray(this.pieceSelected.currentMovePossibilities, [ligne1, colonne1]);
        // Le Pawn a un déplacement de 2 possible lors de son premier déplacement
        if (this.pieceSelected.type === 'Pawn') {
            this.pieceSelected.pieceObject.firstDisplacementCompleted()
        }
        if (index !== -1) {
            const [ligne0, colonne0] = this.pieceSelected.placement
            this.placement[ligne0][colonne0] = null
            this.placement[ligne1][colonne1] = this.pieceSelected.pieceObject
            this.turn.numero += 1
            this.turn.team = this.turn.team === 1 ? 2 : 1
        }
        this.pieceSelected.currentMovePossibilities = []
        return { placement: this.placement, turn: this.turn }
    }


}

module.exports =  {
	ManagerChess: ManagerChess
}