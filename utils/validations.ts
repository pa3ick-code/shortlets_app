export const passwordValidation = {
  required: 'Password is required',
  minLength: { value: 6, message: 'Password must be at least 6 characters' },
  pattern: { 
    value: /^(?=.*[a-zA-Z])(?=.*\d)/, 
    message: 'Password must contain at least one letter and one number' 
  },
};