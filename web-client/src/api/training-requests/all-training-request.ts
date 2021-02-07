import { TrainingRequest } from "../../app/models/training-request";

export const allTrainingRequests: TrainingRequest[] = [
    {
        id: 1,
        training: {
            id: 2,
            name: "Mongo DB",
            level: "JE",
            description: "This is document-oriented db ...",
            skills: [
               "Documents",
               "No relation db"
            ]
        },
        user: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        isCompleted: false,
        status: "PENDING"
    },
    {
        id: 2,
        training: {
            id: 2,
            name: "Angular JS 5",
            level: "SE",
            description: "This is client-side framework ...",
            skills: [
                "Html",
                "Css",
                "Type script"
            ]
        },
        user: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        isCompleted: false,
        status: "PENDING"
    },
    {
        id: 3,
        training: {
            id: 2,
            name: "Node JS",
            level: "JE",
            description: "This is Java Script framework ...",
            skills: [
                "Express Js",
                "Type script"
            ]
        },
        user: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        isCompleted: false,
        status: "PENDING"
    },
    {
        id: 4,
        training: {
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
        user: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        isCompleted: false,
        status: "PENDING"
    },
    {
        id: 5,
        training: {
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
        user: {
            id: 2,
            firstname: "Goran",
            lastname: "Petrovski",
            username: "goran5",
            password: "/"
        },
        isCompleted: false,
        status: "PENDING"
    }
];
