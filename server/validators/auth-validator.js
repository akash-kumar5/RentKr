const {z} = require("zod");

const signupSchema = z.object({
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