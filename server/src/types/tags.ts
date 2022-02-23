import * as yup from "yup"

export type Tag = yup.InferType<typeof tagResponseSchema>
export type Skill = yup.InferType<typeof skillRequestSchema>
export type Role = yup.InferType<typeof roleRequestSchema>

export const tagResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup
    .string()
    .trim() /*.matches(Todo REGEX FOR NAME)*/
    .required(),
  modifiedDate: yup.date(),
})

export const tagRequestSchema = tagResponseSchema.shape({
  id: yup.number().required(),
})

export const skillResponseSchema = tagResponseSchema.shape({
  id: yup.number().required(),
})

export const roleResponseSchema = tagResponseSchema.shape({
  id: yup.number().required(),
})

export const skillRequestSchema = tagRequestSchema.shape({
  id: yup.number(),
})

export const roleRequestSchema = tagRequestSchema.shape({
  id: yup.number(),
})
