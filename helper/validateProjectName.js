export function validateProjectName(input) {
  if (!input.trim()) {
    return "Project name cannot be empty!";
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
    return "Project name can only contain letters, numbers, dashes, and underscores.";
  }

  if (input.length < 3 || input.length > 50) {
    return "Project name must be between 3 and 50 characters long.";
  }
}
