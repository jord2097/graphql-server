import pkg from "graphql-shield";
let { shield, rule } = pkg;

const isAuthenticated = rule()(async (parent, args, { user }) => {
  console.log(user);
  return user !== null;
});

export default shield({
  Query: {
    spaceCenter: isAuthenticated,
    spaceCenters: isAuthenticated,
    planets: isAuthenticated,
    flight: isAuthenticated,
    flights: isAuthenticated,
    booking: isAuthenticated,
    bookings: isAuthenticated,
  },
  Mutation: {
    scheduleFlight: isAuthenticated,
    bookFlight: isAuthenticated,
  },
});
