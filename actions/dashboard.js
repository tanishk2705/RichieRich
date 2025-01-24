"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"


/* 
        Prisma returns Decimal fields as Decimal objects (from the decimal.js library), not as regular JavaScript numbers. These Decimal objects cannot be directly serialized to JSON, which is necessary when:
        Sending data over an API
        Passing data between client and server components in Next.js
        Using the data in client-side JavaScript 
*/
const serializeTransaction = (obj)=> {
        const serialized = {...obj}
        if(obj.balance){
                serialized.balance = obj.balance.toNumber()
        }
        return serialized
}


export default async function createaAccount(data){
        try{
              const {userId} = await auth()
              if(!userId){
                throw new Error("Unauthorized")
              }
              const user = await db.user.findUnique({
                where : {
                        clerkUserId:userId
                }
              })
              if(!user){
                throw new Error("User not found")
              }

                //Convert balance to float before saving
              const balanceFloat = parseFloat(data.balance)
              if(isNaN(balanceFloat)){
                 throw new Error("Invalid balance amount")
              }
              
              //check if this is user's first account
              const existingAccounts = await db.account.findMany({
                where : {
                        userId : user.id
                }
              })

              //Check if it's the first account, make it default regardless of user input, if not use the user's preference
              const shouldBeDefault = existingAccounts.length===0 ? true : data.isDefault

              //if this account should be defaut, unset other default accounts
              if(shouldBeDefault){
                await db.account.updateMany({
                        where : {
                                userId : user.id,
                                isDefault : true
                        },
                        data:{
                                isDefault : false
                        }
                })
              }

              //create new account
              const account = await db.account.create({
                        data : {
                                ...data,
                                balance:balanceFloat,
                                userId:user.id,
                                isDefault : shouldBeDefault //overrided the default based on our logic

                        }
              })


              //serialize the account before returning
              const serializedAccount = serializeTransaction(account)
              revalidatePath("/dashboard")
              return {success:true, data:serializedAccount}

        }
        catch(error) {
                throw new Error(error.message)
        }
}


/* 

        revalidatePath()
        Common scenarios where it's needed:
        1.After creating/updating/deleting data
        2.When changes need to be immediately visible
        3.For real-time updates in server components 

        Without revalidatePath("/dashboard"):
        1.The dashboard might continue showing old data
        2.Users might need to manually refresh to see their new account
        3.There could be a disconnect between the database state and what users see
*/