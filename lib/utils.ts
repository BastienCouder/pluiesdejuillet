import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translateAuthError(error: any): string {
  const message =
    error?.body?.message || error?.message || 'Une erreur est survenue'

  if (message.includes('User already exists')) {
    return 'Impossible de créer le compte. Veuillez vérifier vos informations.'
  }
  if (
    message.includes('Invalid email or password') ||
    message.includes('Invalid password') ||
    message.includes('Invalid email')
  ) {
    return 'Email ou mot de passe incorrect.'
  }
  if (message.includes('password is too short')) {
    return 'Le mot de passe doit contenir au moins 8 caractères.'
  }
  if (message.includes('Failed to create user')) {
    return "Une erreur est survenue lors de l'inscription."
  }
  if (message.includes('Network Error') || message.includes('fetch')) {
    return 'Erreur de connexion au serveur.'
  }

  return message
}
