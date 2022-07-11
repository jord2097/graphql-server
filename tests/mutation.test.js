import "isomorphic-fetch";

let token;
beforeAll(async () => {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
                mutation {

                    login(email: "test@gmail.com") 
                }

        `,
    }),
  });

  const data = await response.json();
  token = data.data.login;
});

test("mutation to create flight", async () => {
  // expected result

  let resp = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `   mutation Mutation($flightInfo: ScheduleFlightInput!) {
            scheduleFlight(flightInfo: $flightInfo) {
              id
              code
              departure_at
              seat_count
              launching_site {
                name
              }
              landing_site {
                name
              }
              available_seats
            }
          }

        `,
      variables: {
        flightInfo: {
          launchSiteId: "da9c2dee-3b38-4d21-b911-083599c05dad",
          landingSiteId: "3d1d7388-5760-4658-aa3d-b90d88cc457d",
          departureAt: "2007-12-03T10:15:30Z",
          seatCount: 354,
        },
      },
    }),
  });
  //console.log(resp)
  let json = await resp.json();
  //console.log(json)

  expect(json.data).toEqual(
    expect.objectContaining({
      scheduleFlight: expect.any(Object),
    })
  );
});
//  user should be authorized with a token to access the api
test("mutation to create flight should return error if user is not authorized", async () => {
  let resp = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `   mutation Mutation($flightInfo: ScheduleFlightInput!) {
                scheduleFlight(flightInfo: $flightInfo) {
                  id
                  code
                  departure_at
                  seat_count
                  launching_site {
                    name
                  }
                  landing_site {
                    name
                  }
                  available_seats
                }
              }
    
            `,
      variables: {
        flightInfo: {
          launchSiteId: "da9c2dee-3b38-4d21-b911-083599c05dad",
          landingSiteId: "3d1d7388-5760-4658-aa3d-b90d88cc457d",
          departureAt: "2007-12-03T10:15:30Z",
          seatCount: 354,
        },
      },
    }),
  });
  //console.log(resp)
  let json = await resp.json();

  expect(json).toEqual(
    expect.objectContaining({
      errors: expect.any(Array),
    })
  );
});
