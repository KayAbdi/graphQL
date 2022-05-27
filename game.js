var express         =  require('express');
var { graphqlHTTP } =  require('express-graphql');
var { buildSchema } =  require('graphql');

var gameCatalogue = [

    {
        "id": 1,
        "title": "Game B",
        "publisher": "Publisher ABC",
        "developer": "Developer DEF",
        "releaseDate": "2015-01-01",
        "platforms": [
            { "id": 1, "name": "Xbox" },
            { "id": 2, "name": "Playstation"},
            { "id": 3, "name": "PC"}
        ],
        "estrbRating": {
            "id": 1,
            "code": "E",
            "name": "everyone"
        }
    },
    {
        "id": 2,
        "title": "Game C",
        "publisher": "Publisher ABC",
        "developer": "Developer DEF",
        "releaseDate": "2018-01-01",
        "platforms": [
            { "id": 1, "name": "Xbox" },
            { "id": 3, "name": "PC"}
        ],
        "estrbRating": {
            "id": 1,
            "code": "E",
            "name": "everyone"
        }
    },
    {
        "id": 3,
        "title": "Game A",
        "publisher": "Publisher ABC",
        "developer": "Developer DEF",
        "releaseDate": "2020-01-01",
        "platforms": [
            { "id": 1, "name": "Xbox" },
            { "id": 2, "name": "Playstation"}
        ],
        "estrbRating": {
            "id": 2,
            "code": "M",
            "name": "Mature"
        }
    }
]

// build schema here
var schema = buildSchema(`
    type Query {
        games: [Game]
    },
    type Game {
        title: String
        publisher: String
        developer: String
        platforms: [Platform]
        estrbRating: [estrbRating]
    }
    type Platform {
        id: Int
        name: String
    }
    type estrbRating {
        id: Int
        code: String
        name: String
    }
`);

//The root provides a resolver function for each API endpoint
var root =  {
    games: () => gameCatalogue
};

var app = express();
app.use('/graphql2', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4001,  function(){
    console.log('Running on port 4001');
});