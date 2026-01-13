import 'dotenv/config'
import { prisma } from "@/lib/prisma"

const Users = [
    {
        name: 'Dan Abramov',
        email: 'dan.abramov@example.com',
        password: null,
        emailVerified: new Date('2024-01-15T10:30:00Z'),
        image: 'https://avatars.githubusercontent.com/u/810438'
    },
    {
        name: 'Sarah Drasner',
        email: 'sarah.drasner@example.com',
        password: null,
        emailVerified: new Date('2024-02-20T08:00:00Z'),
        image: 'https://avatars.githubusercontent.com/u/2281088'
    },
    {
        name: 'Kent C. Dodds',
        email: 'kent.dodds@example.com',
        password: '$2b$10$hashedpasswordexample',
        emailVerified: new Date('2023-11-10T14:45:00Z'),
        image: 'https://avatars.githubusercontent.com/u/1500684'
    },
    {
        name: 'Evan You',
        email: 'evan.you@example.com',
        password: null,
        emailVerified: null,
        image: 'https://avatars.githubusercontent.com/u/499550'
    },
    {
        name: 'Anonymous User',
        email: 'anonymous@example.com',
        password: '$2b$10$anotherhashedpassword',
        emailVerified: null,
        image: null
    },
]

const main = async () => {
    console.log(`Seeding Process starts at ${new Date()}`)
    for (const user of Users) {
        await prisma.user.create({
            data: {...user}
        })
        console.log(`Seeding made for user with ${user.email} email`)
    }

    console.log('Seeding completed for all users')
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect();
    })