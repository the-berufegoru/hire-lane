import { phoneSchema } from "./phone"; 

describe("Phone Number Schema Validation", () => {
  it("should pass for a valid phone number with country code", () => {
    const { error } = phoneSchema.validate("+1234567890");
    expect(error).toBeUndefined();
  });

  it("should fail for an invalid phone number (no country code)", () => {
    const { error } = phoneSchema.validate("1234567890");
    expect(error?.message).toBe(
      "Please enter a valid phone number with country code."
    );
  });

  it("should fail for an invalid phone number format (missing + sign)", () => {
    const { error } = phoneSchema.validate("1-234567890");
    expect(error?.message).toBe(
      "Please enter a valid phone number with country code."
    );
  });

  it("should fail for an invalid phone number with invalid country code", () => {
    const { error } = phoneSchema.validate("+001234567890");
    expect(error?.message).toBe(
      "Please enter a valid phone number with country code."
    );
  });

  it("should fail for a phone number shorter than required length", () => {
    const { error } = phoneSchema.validate("+12345");
    expect(error?.message).toBe(
      "Please enter a valid phone number with country code."
    );
  });

  it("should fail for a phone number longer than required length", () => {
    const { error } = phoneSchema.validate("+12345678901234567890");
    expect(error?.message).toBe(
      "Please enter a valid phone number with country code."
    );
  });

  it("should fail for an empty phone number", () => {
    const { error } = phoneSchema.validate("");
    expect(error?.message).toBe("Phone number cannot be empty.");
  });

  it("should fail if phone number is null", () => {
    const { error } = phoneSchema.validate(null);
    expect(error?.message).toBe("Phone number is required.");
  });
});
