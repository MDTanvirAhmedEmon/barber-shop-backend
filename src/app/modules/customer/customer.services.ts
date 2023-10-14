import { Customer, CustomerProfile, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createCustomer = async(customerProfile: CustomerProfile ,customerData: Customer): Promise<any> => {

    const result = await prisma.$transaction(async transactionClient => {
        const customer = await transactionClient.customer.create({
            data: customerData
        });
    
        const profile = await transactionClient.customerProfile.create({
            data: {
                ...customerProfile,
                customerId: customer.id,
            }
        });

        return {
            customer,
            profile,
        }
    })

    return result;
};


export const customerServices = {
    createCustomer,
};