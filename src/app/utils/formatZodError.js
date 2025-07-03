const formatZodError = (zodError) => {
  return zodError.errors.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};

export default formatZodError;
