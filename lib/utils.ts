import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get avatar path based on user gender and studentId
 * Uses studentId to generate consistent random selection
 */
export function getAvatarByGender(gender?: string, studentId?: string): string {
  const isFemale = gender?.toLowerCase() === 'female' || gender?.toLowerCase() === 'nữ' || gender?.toLowerCase() === 'nu'
  
  // Generate consistent random number based on studentId
  let seed = 0
  if (studentId) {
    for (let i = 0; i < studentId.length; i++) {
      seed += studentId.charCodeAt(i)
    }
  } else {
    seed = Date.now()
  }
  
  if (isFemale) {
    // 4 female avatars
    const femaleCount = 4
    const index = (seed % femaleCount) + 1
    return `/avartar/female${index}.png`
  } else {
    // 3 male avatars
    const maleCount = 3
    const index = (seed % maleCount) + 1
    return `/avartar/male${index}.png`
  }
}
