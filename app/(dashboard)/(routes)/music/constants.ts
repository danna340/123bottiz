'use client'
import * as z from 'zod'

export const promptSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Music Prompt is required.'
  })
});