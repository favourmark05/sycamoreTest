export const useValidation = () => {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
  
    const validatePhone = (phone) => {
      return /^[0-9]{11}$/.test(phone)
    }
  
    const validateRequired = (value) => {
      return value && value.trim().length > 0
    }
  
    return {
      validateEmail,
      validatePhone,
      validateRequired
    }
  }