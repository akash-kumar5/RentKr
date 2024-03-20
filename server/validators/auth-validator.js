const {z} = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message : "Name must be atleast 3 chars."})
    .max(200,{ message : "Name cant be more than 200 character"}),
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"}),
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message : "Phone No. must be of 10 digits"})
    .max(10,{ message : "Phone No. must be of 10 digits"}),
    password : z
    .string({required_error:"Password is required"})
    .min(8,{message:"password must be of 8 characters"})
    .max(100,{message:"Password cant be more than 100 characters"}),
});

module.exports = signupSchema;