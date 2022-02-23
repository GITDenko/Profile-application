import * as yup from "yup"
import { roleRequestSchema, skillRequestSchema } from "./tags"
import { educationSchema, experienceSchema } from "./experience"

export type Profile = yup.InferType<typeof profileSchema>

// TODO check minimum of each role skill education experience
export const profileSchema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  contactNumber: yup.string(),
  imageUrl: yup.string(),
  roles: yup.array(roleRequestSchema),
  skills: yup.array(skillRequestSchema),
  educations: yup.array(educationSchema),
  experiences: yup.array(experienceSchema),
  modifiedDate: yup.date(),
  personalSummary: yup.string(),
})
