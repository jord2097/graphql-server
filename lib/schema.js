export  default `
type Query { 
    # Returns a specific space Center
spaceCenter(uid:String,id:Int): SpaceCenter!

# Returns a paginated list of space centers

spaceCenters(page:Int,pageSize:Int):[SpaceCenters!] 
# return a list of planets
 planets:Planet!

# return a single flight with id
   flight(id:Int):Flight! 

# Returns a list of Flight type
flights(page:Int,pageSize:Int,to:Int,from:Int, seatCount:Int):[Flights]!

# query a single booking by its id
  booking(id:Int):Booking!

# Return a list of bookings
  bookings(email:String,page:Int,pageSize:Int): [Bookings!]!

# 
}

#type Mutation { 
# book a flight
#bookFlight(bookInfo:$BookingInput):Booking!

#schedulea Flight

#scheduleFlight(flightInfo:$FlightInput): Flight!

#}


scalar Date
type Planet {
    id: Int,
    name: String,
    code: String,
    spaceCenters(limit:Int): [SpaceCenter]!
}

type Flights{ 
   pagination:Pagination,
   nodes:Flight,
   
}

type Bookings { 
pagination:Pagination,
nodes:Booking!
}
type SpaceCenters {
    pagination:Pagination!,
    nodes:SpaceCenter!
}

type Pagination { 
 page:Int,
pageSize:Int,
total:Int
}

type SpaceCenter {
    id: Int,
    uid: String,
    name: String,
    description: String,   
    planet:Planet!,
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