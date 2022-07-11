import {
  planets,
  spaceCenters,
  flights,
  bookings,
} from "../db/queryBuilders.js";
import pkg from "graphql-iso-date";
const { GraphQLDate, GraphQLDateTime } = pkg;
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { secret } from "./config.js";
const resolvers = {
  // Queries
  Query: {
    planets: (_, args, ctx) =>  {
        if (!ctx.user) {
            return Error("You must be logged in to access this data");
          }
        return planets.getAll()
     } ,
    
    spaceCenter: (_, args, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      return spaceCenters.getBy(args);
    },
    spaceCenters: (_, args, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      return args;
    },
    flight: (_, { id }, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }

      return flights.getById(id);
    },
    flights: (_, args, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      return args;
    },
    booking: (_, { id }, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }

      return bookings.getById(id);
    },
    bookings: (_, args, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      return args;
    },
  },
  // Types
  Planet: {
    // fetches space centers of a planet limited to int in args.limit or 5 if null
    spaceCenters: (parent, args) => spaceCenters.getByCode(parent.code, args.limit ? args.limit : 5)
  },
  SpaceCenter: {
    planet: (parent) => planets.getByCode(parent.planet_code), // assigns each space-center its planet
  },
  SpaceCenters: {
    pagination: async (parent) => {
      // use default page args if none specified
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let total = await spaceCenters.getCount();
      return {
        total: total.count,
        page: page,
        pageSize: pageSize,
      };
    },
    nodes: (parent) => {
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let pageIndex = page * pageSize - pageSize; // e.g. pageIndex of 2 shows results 10-20
      return spaceCenters.getAllPaginated(pageIndex, pageSize);
    },
  },
  Flight: {
    launching_site: (flight, args, context, info) =>
      spaceCenters.getbyUID(flight.launching_site_id),
    landing_site: (flight, args, context, info) =>
      spaceCenters.getbyUID(flight.landing_site_id),
  },
  Flights: {
    pagination: async (parent) => {
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let total = await flights.getCount();
      return {
        total: total.count,
        page: page,
        pageSize: pageSize,
      };
    },
    nodes: (parent) => {
      // parent is an obj containing the variables
      // these variables need defaults, the filters like to/from don't
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let pageIndex = page * pageSize - pageSize; // e.g. pageIndex of 2 shows results 10-20
      return flights.getAllPaginated(parent, pageIndex, pageSize);
    },
  },
  Booking: {
    flight: (booking, args, ctx, info) => flights.getByCode(booking.flight),
  },
  Bookings: {
    pagination: async (parent) => {
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let total = await bookings.getCount();
      return {
        total: total.count,
        page: page,
        pageSize: pageSize,
      };
    },
    nodes: (parent) => {
      // parent is an obj containing the variables
      // these variables need defaults, the filters like to/from don't
      let page = parent.page ? parent.page : 1;
      let pageSize = parent.pageSize ? parent.pageSize : 10;
      let pageIndex = page * pageSize - pageSize; // e.g. pageIndex of 2 shows results 10-20
      return bookings.getAllPaginated(parent, pageIndex, pageSize);
    },
  },
  // Mutations
  Mutation: {
    scheduleFlight: async (_, { flightInfo }, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      const uniqueCode = crypto.randomBytes(16).toString("hex");
      const result = await flights.schedule(flightInfo, uniqueCode);
      console.log(result[0]);
      return result[0];
    },
    bookFlight: async (_, { bookInfo }, ctx) => {
      if (!ctx.user) {
        return Error("You must be logged in to access this data");
      }
      const result = await bookings.book(bookInfo);
      flights.bookSeats(bookInfo);
      return result[0];
    },
    login: async (_, { email }, ctx) => {
      const token = jwt.sign({ email }, secret);

      ctx.user = { token };
      return token;
    },
  },
  // Scalars
  Date: GraphQLDateTime,
};

export default resolvers;
