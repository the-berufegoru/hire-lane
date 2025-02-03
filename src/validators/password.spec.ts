import { passwordSchema } from "./password";

describe("passwordSchema", () => {
  it("should pass validation for a valid password", () => {
    const { error } = passwordSchema.validate("ValidPass123!");
    expect(error).toBeUndefined();
  });

  it("should fail if password is empty", () => {
    const { error } = passwordSchema.validate("");
    expect(error?.message).toBe("Please enter a password.");
  });

  it("should fail if password is missing", () => {
    const { error } = passwordSchema.validate(undefined);
    expect(error?.message).toBe("Password is required.");
  });

  it("should fail if password is too short", () => {
    const { error } = passwordSchema.validate("Short1!");
    expect(error?.message).toBe(
      "Password should be at least 12 characters long."
    );
  });

  it("should fail if password is too long", () => {
    const longPassword = "A".repeat(65);
    const { error } = passwordSchema.validate(longPassword);
    expect(error?.message).toBe("Password should not exceed 64 characters.");
  });

  it("should fail if password contains invalid characters", () => {
    const { error } = passwordSchema.validate("ValidPass123🔥");
    expect(error?.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });

  it("should fail if password does not contain special characters", () => {
    const { error } = passwordSchema.validate("ValidPass123");
    expect(error?.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });

  it("should fail if password does not contain a number", () => {
    const { error } = passwordSchema.validate("ValidPass!!!");
    expect(error?.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });

  it("should fail if password does not contain an uppercase letter", () => {
    const { error } = passwordSchema.validate("validpass123!");
    expect(error?.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });

  it("should fail if password does not contain a lowercase letter", () => {
    const { error } = passwordSchema.validate("VALIDPASS123!");
    expect(error?.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });
});
