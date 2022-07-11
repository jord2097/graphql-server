import 'isomorphic-fetch'

test('login mutation returns a token', () => {
return fetch ('http://localhost:3000/graphql', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', authorization: 'TOKEN GOES HERE'},
    body: JSON.stringify({query: 
        `mutation {
            login(email: "jordan@passengers.com"){               
            }
        }
        `
    })
})
.then(res => res.json())
.then(res => expect(res.data.login).tobeInstanceOf(string))
})