import { USERS } from './users'

export const POSTS = [
    {
        imageUrl: 'https://i.pinimg.com/474x/c4/15/16/c41516d5f1175fcee513d55f9a7aa18f.jpg',
        user: USERS[0].user,
        likes: 111,
        caption: 'Train to Hogwarts.',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'thebodykoli',
                comment: 'wow, this is so beautiful, i wanna go there'
            },
        ]
    },
    {
        imageUrl: 'https://i.pinimg.com/474x/19/0d/56/190d56f7981e941877cdb6753c0235b8.jpg',
        user: USERS[1].user,
        likes: 191,
        caption: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for it will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'thebodykoli',
                comment: 'wow, this is so beautiful, i wanna go there'
            },
            {
                user: 'thefacekoli',
                comment: 'OMG, so beautiful, i wanna go there'
            },
        ]
    },
    {
        imageUrl: 'https://i.pinimg.com/474x/0f/60/6e/0f606eeebb10b85c32c04a1c4aa0ef52.jpg',
        user: USERS[2].user,
        likes: 456,
        caption: 'The Field is a 1990 Irish drama film written and directed by Jim Sheridan and starring Richard Harris, John Hurt, Sean Bean, Brenda Fricker and Tom Berenger. It was adapted from John B Kane.',
        profile_picture: USERS[2].image,
        comments: [
            {
                user: 'thebodykoli',
                comment: 'wow, this is so beautiful, i wanna go there'
            },
            {
                user: 'thefacekoli',
                comment: 'OMG, so beautiful, i wanna go there'
            },
            {
                user: 'haloikoli',
                comment: 'This film written and directed by Jim Sheridan'
            },
        ]
    },
]