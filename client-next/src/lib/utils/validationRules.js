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
    validate: (value) => value.trim() !== "" || "Address cannot be empty",
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
    validate: (value) => {
      const trimmed = value.trim();
      if (trimmed.length < 6)
        return "Password must be at least 6 non-space characters";
      if (trimmed === "") return "Password cannot be empty or just spaces";
      return true;
    },
  },
  confirmPassword: (getValues) => ({
    required: "Confirm Password is required",
    validate: (value) =>
      value === getValues("password") || "Passwords do not match",
  }),
};

export const loginValidationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
  },
};
