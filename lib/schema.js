export  default `
type Query { 
# Returns a specific space Center
spaceCenter(uid:String,id:Int): SpaceCenter!

# Returns a paginated list of space centers
spaceCenters(pageSize:Int,page:Int): SpaceCenters!

# return a list of planets
planets:[Planet!]

# return a single flight with id
flight(id:Int):Flight! 

# Returns a list of Flight type
flights(page:Int,pageSize:Int,to:String,from:String,departureDate:Date,seatCount:Int):Flights!

# query a single booking by its id
booking(id:Int):Booking!

# Return a list of bookings
bookings(email:String,page:Int,pageSize:Int): Bookings!

}

type Mutation {

# Schedule a Flight
scheduleFlight(flightInfo:ScheduleFlightInput!): Flight

# Book a flight
bookFlight(bookInfo:BookingInfoInput!): Booking!

# Login (recieve token)
login(email: String!): String

}

scalar Date

type Planet {
    id: Int,
    name: String,
    code: String,
    spaceCenters(limit:Int): [SpaceCenter]!
}

type SpaceCenter {
    id: Int!,
    uid: String!,
    name: String!,
    description: String,   
    planet:Planet!,
    latitude: Float!,
    longitude: Float!
}

type Flight {
    id: Int!,
    code: String!,
    departure_at: Date!,
    seat_count: Int!
    launching_site: SpaceCenter!
    landing_site: SpaceCenter!
    available_seats: Int!
}

type Booking {
    id: Int!,
    seat_count: Int!,
    email: String!,
    flight: Flight!
}

type Flights { 
   pagination:Pagination!,
   nodes:[Flight]!,   
}

type Bookings { 
    pagination:Pagination!,
    nodes:[Booking]!
}

type SpaceCenters {
    pagination:Pagination!,
    nodes:[SpaceCenter]!
}

type Pagination { 
    page:Int!, # current page number
    pageSize:Int!, # number of items per page
    total:Int!,   
}

input ScheduleFlightInput { 
    launchSiteId:String!
    landingSiteId:String!
    departureAt:Date!
    seatCount:Int!
}

input BookingInfoInput { 
    seatCount:Int!,
    flightId:String!,
    email:String!
}
`