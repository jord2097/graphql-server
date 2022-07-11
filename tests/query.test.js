import 'isomorphic-fetch'

test('spacecenter query returns the desired spacecenter', () => {
    
    // expected result
    const simonisUnderpass = {
        "name": "Simonis Underpass Space Center",
        "uid": "a721033e-41a4-413d-9e65-854c33635b61",
        "description": "Amet exercitationem voluptate. Sit amet dolor sit voluptatem quia voluptas veniam optio optio. Commodi recusandae soluta sed atque voluptates sint. Totam nihil illum delectus. Similique tempore laudantium enim corrupti architecto porro. Et sunt voluptas sunt eligendi quaerat vel est accusantium vel.",
        "latitude": "-50.1055",
        "longitude": "79.5640",
        "planet_code": "MER"
    }

return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: "TOKEN GOES HERE"},
    body: JSON.stringify({query:
        `query {            
            spaceCenter(uid: "a721033e-41a4-413d-9e65-854c33635b61"{
                name
                uid
                description
                latitude
                longitude
                planet_code
              }
        }

        `
    }),
})
.then(res => res.json())
// the test condition
.then(res => expect(res.data).toStrictEqual(simonisUnderpass))



})