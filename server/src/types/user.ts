import * as yup from "yup"

export type User = yup.InferType<typeof userResSchema>

export const userResSchema = yup
  .object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    roles: yup.array(yup.string().required()).min(1).required(),
  })
  .defined()

export const AppUser: string = "User"
export const AppApprover: string = "Approver"
