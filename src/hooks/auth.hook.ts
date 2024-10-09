import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser } from "../services/AuthService"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey : ["USER_REGISTRATION"],
        mutationFn : async (userData) => await registerUser(userData),
        onSuccess : () => {
             toast.success("User created successfully")
        },
        onError : (error) => {
             toast.error(error.message)
        }
    })
}

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey : ["LOGIN_USER"],
        mutationFn : async (userData) => await loginUser(userData),
        onSuccess : () => {
            toast.success("User Logged successfully")
       },
       onError : (error) => {
            toast.error(error.message)
       }
    })
}