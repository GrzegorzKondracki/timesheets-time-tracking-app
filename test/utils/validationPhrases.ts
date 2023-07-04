interface validationPhrases {
  invalidEmailPhrase: string;
  forgotPassInvalidEmailPhrase: string;
  missingOneDigitValidationPhrase: string;
  lessThan8CharactersPhrase: string;
  missingUppercaseLetterPhrase: string;
  emptyInputPhrase: string;
  signInNotSuccessfulPhrase: string;
  signInSuccessfulPhrase: string;
  signUpSuccessfulPhrase: string;
  invalidProjectDescriptionPhrase: string;
  invalidProjectNamePhrase: string;
  digitInStringValidationPhrase: string;
  emptyInputValidationPhrase: string;
}

const validationPhrases: validationPhrases = {
  invalidEmailPhrase: "Not valid email address",
  forgotPassInvalidEmailPhrase: "Please enter a valid e-mail address",
  missingOneDigitValidationPhrase: "Password should contain at least one digit",
  lessThan8CharactersPhrase: "Password should consist of at least eight characters",
  missingUppercaseLetterPhrase: "Password should contain an uppercase character",
  emptyInputPhrase: "Value is required",
  signInNotSuccessfulPhrase: "Sign in not successful",
  signInSuccessfulPhrase: "Sign in successful",
  signUpSuccessfulPhrase: "Workspace created",
  invalidProjectDescriptionPhrase: "Description should be at least 3 characters long",
  invalidProjectNamePhrase: "Please select a project",
  digitInStringValidationPhrase: "Value contains digit",
  emptyInputValidationPhrase: "Value is required",
};

export default validationPhrases;
