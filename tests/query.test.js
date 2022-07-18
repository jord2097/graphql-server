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

test("spacecenter query returns the desired spacecenter", async () => {
  // expected result
  const simonisUnderpass = {
    name: "Simonis Underpass Space Center",
    uid: "a721033e-41a4-413d-9e65-854c33635b61",
    description:
      "Amet exercitationem voluptate. Sit amet dolor sit voluptatem quia voluptas veniam optio optio. Commodi recusandae soluta sed atque voluptates sint. Totam nihil illum delectus. Similique tempore laudantium enim corrupti architecto porro. Et sunt voluptas sunt eligendi quaerat vel est accusantium vel.",
    latitude: -50.1055
    ,
    longitude: 79.5640,
    
  };

  let resp = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `   query {       
            spaceCenter(uid: "a721033e-41a4-413d-9e65-854c33635b61"){
                name
                uid
                description
                latitude
                longitude
                
              
              }
            } 

        `,
    }),
  });
  //console.log(resp)
  let json = await resp.json();

  expect(json.data).toEqual(
    expect.objectContaining({
      spaceCenter: expect.any(Object),
    }),
  expect(json.data.spaceCenter).toEqual(simonisUnderpass)
  );
});
