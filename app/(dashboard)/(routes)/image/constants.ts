'use client'
import * as z from 'zod'

export const promptSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Image prompt is required.'
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1)
});

//User amount of images request
export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
];

//User resolution request
export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256"
  },
  {
    value: "512x512",
    label: "512x512"
  },
  {
    value: "1024x1024",
    label: "1024x1024"
  },
];