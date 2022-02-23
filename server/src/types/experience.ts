import * as yup from "yup"
import { roleRequestSchema, skillRequestSchema } from "./tags"

// TODO Extend the classes together to ensure inheritance in properties
export type History = yup.InferType<typeof experienceSchema>
export type Experience = yup.InferType<typeof experienceSchema>
export type Education = yup.InferType<typeof educationSchema>
export type Period = yup.InferType<typeof periodSchema>

export const periodSchema = yup.object({
  startDate: yup.date(),
  endDate: yup.date(),
  totalYears: yup.number(),
  totalMonths: yup.number(),
})

const historySchema = yup.object({
  id: yup.number(),
  name: yup.string().required(),
  place: yup.string().required(),
  period: periodSchema,
  modifiedDate: yup.date(),
})

export const educationSchema = historySchema.shape({
  id: yup.number(),
  course: yup.string(),
  program: yup.string(),
})

export const experienceSchema = historySchema.shape({
  id: yup.number(),
  content: yup.string().required(),
  skills: yup.array(skillRequestSchema).min(1).required("Skills Required"),
  roles: yup.array(roleRequestSchema).min(1).required("Roles Required"),
})
