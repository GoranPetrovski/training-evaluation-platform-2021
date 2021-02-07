import { TrainingRating } from "../../app/models/training-rate";

export const trainingRatings: TrainingRating[] = [
    {
        id: 1,
        trainingId: {
            id: 2,
            name: "Mongo DB",
            level: "JE",
            description: "This is document-oriented db ...",
            skills: [
                "Documents", "No relation db"
            ]
        },
        userId: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        rating: 3,
        hasCup: false
    },
    {
        id: 2,
        trainingId: {
            id: 2,
            name: "Angular JS 5",
            level: "SE",
            description: "This is client-side framework ...",
            skills: ["Html", "Css", "Type script"
            ]
        },
        userId: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        rating: 1,
        hasCup: false
    },
    {
        id: 3,
        trainingId: {
            id: 2,
            name: "Node JS",
            level: "JE",
            description: "This is Java Script framework ...",
            skills: ["Express Js", "Type script"]
        },
        userId: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        rating: 5,
        hasCup: false
    },
    {
        id: 4,
        trainingId: {
            id: 2,
            name: "AWS",
            level: "JE",
            description: "This is AWS Services ...",
            skills: [
                "Dynamo DB",
                "Cloudfront",
                "S3",
                "Cloud Formation"
            ]
        },
        userId: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        rating: 2,
        hasCup: false
    },
    {
        id: 5,
        trainingId: {
            id: 2,
            name: "MySql",
            level: "JE",
            description: "This is relational db ...",
            skills: [
                "write Queries",
                "using joins",
                "Store procedures"
            ]
        },
        userId: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        rating: 4,
        hasCup: false
    }
];