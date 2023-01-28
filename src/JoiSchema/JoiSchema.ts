import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and atleast 8 characters long')),

    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
        .error(new Error('Invalid Email')),
}).with('email', 'password');


export const SignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and atleast 8 characters long')),


    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Enter a valid Email')),


    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
        .error(new Error('Password and Confirm Password Do not Match')),
}).with('email', 'password').with('password', 'confirmPassword');

export const AddBlogSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),
    color: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Color')),



})
export const TitleSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Title')),
})
export const DescriptionSchema = Joi.object({
    location: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Description')),
})

export const EmailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Enter a valid Email')),
})
