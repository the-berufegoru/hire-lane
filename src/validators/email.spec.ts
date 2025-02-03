import { emailSchema } from "./email";

describe("Email Schema Validation", () => {
  it("should pass for a valid email", () => {
    const { error } = emailSchema.validate("user@example.com");
    expect(error).toBeUndefined();
  });

  it("should fail for an invalid email format", () => {
    const { error } = emailSchema.validate("invalid-email");
    expect(error?.message).toBe("Please enter a valid email address.");
  });

  it("should fail if email is missing", () => {
    const { error } = emailSchema.validate("");
    expect(error?.message).toBe("Email cannot be just spaces or empty.");
  });

  it("should fail if email contains only spaces", () => {
    const { error } = emailSchema.validate("   ");
    expect(error?.message).toBe("Email cannot be just spaces or empty.");
  });

  it("should fail if email lacks a domain", () => {
    const { error } = emailSchema.validate("user@");
    expect(error?.message).toBe("Please enter a valid email address.");
  });

  it("should fail for an email without a TLD", () => {
    const { error } = emailSchema.validate("user@localhost");
    expect(error?.message).toBe("Please enter a valid email address.");
  });

  it("should pass for a valid email with subdomains", () => {
    const { error } = emailSchema.validate("user@mail.example.com");
    expect(error).toBeUndefined();
  });
});
