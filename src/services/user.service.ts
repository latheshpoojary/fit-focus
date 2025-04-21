import {PrismaClient} from '../../generated/prisma'

const prisma = new PrismaClient();

export const _addUser = async (body:{
    email:string,
    name:string,
})=>{
    try {
        const newUser = await prisma.user.create({
            data:body
        })
        return newUser
    } catch (error) {
        throw new Error(`Failed to add user`)
    }
}