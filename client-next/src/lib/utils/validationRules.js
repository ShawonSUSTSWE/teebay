export const signupValidationRules = {
  firstName: {
    required: "First Name is required",
    validate: (value) => value.trim() !== "" || "First Name cannot be empty",
  },
  lastName: {
    required: "Last Name is required",
    validate: (value) => value.trim() !== "" || "Last Name cannot be empty",
  },
  address: {
    required: "Address is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  phoneNumber: {
    required: "Phone Number is required",
    pattern: {
      value: /^(\+8801|8801|01)[0-9]{9}$/,
      message: "Enter a valid Bangladeshi phone number",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  confirmPassword: (getValues) => ({
    required: "Confirm Password is required",
    validate: (value) =>
      value === getValues("password") || "Passwords do not match",
  }),
};
