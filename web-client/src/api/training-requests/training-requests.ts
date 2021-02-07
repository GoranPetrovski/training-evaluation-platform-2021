import { TrainingRequest } from "../../app/models/training-request";

export const trainingRequests: TrainingRequest[] = [
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
        status: "APPROVED"
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
        status: "APPROVED"
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
        status: "APPROVED"
    }
];
