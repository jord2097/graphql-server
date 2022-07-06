export  default `

type Query { 
    planets:[Planet!]
    spaceCenters(limit:Int):[SpaceCenter]!
    

    
}

scalar Date
type Planet {
    id: Int,
    name: String,
    code: String,
    spaceCenters:[SpaceCenter!]
}

type SpaceCenter {
    id: Int,
    uid: String,
    name: String,
    description: String,
    latitude: Float,
    longitude: Float
}

type Flight {
    id: Int,
    code: String,
    departure_at: Date!,
    seat_count: Int
    launching_site: SpaceCenter!
    landing_site: SpaceCenter!
}

type Booking {
    id: Int,
    seat_count: Int,
    email: String,
    flight: Flight!
}




`