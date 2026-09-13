export function parseApiError(error: unknown): string {
  if (error instanceof Error) {
    // If authFetch throws an UNAUTHORIZED error with a flag, return a specific token.
    // We will use this token in the components to ignore the error.
    if ((error as any).isUnauthorized) {
      return "UNAUTHORIZED_ERROR_SILENT";
    }
    
    // Check if the error message is a JSON string (sometimes backend sends JSON in the message)
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed === "object" && parsed.message) {
        return parsed.message;
      }
    } catch {
      // Not JSON, just use the message
    }
    
    // Prevent generic "Failed to fetch" if there's a better one
    if (error.message.includes("Unexpected token")) {
      return "An unexpected server error occurred.";
    }

    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred.";
}
