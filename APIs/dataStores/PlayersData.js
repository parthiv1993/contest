
export class Player{
    constructor(id=0,name='',team='',grade=''){
        this.playerId =id;
        this.name = name;
        this.team = team;
        this.grade =grade;
        this.bids = [];
        this.soldTo = null;
        this.soldAt = null;
    }
}

export const AllPlayers = [
    new Player(1,'Parthiv Patel','India','A'),
    new Player(2,'MSD','India','A'),
    new Player(3,'Yuvi','India','A'),
    new Player(4,'Sehwag','India','B'),
    new Player(5,'Balaji','India','C'),
    new Player(6,'Munaf','India','C'),
    new Player(7,'Dravid','India','A')
]