import * as dotenv from "dotenv";
dotenv.config();

interface credentials {
  validEmailAdress: string;
  validPassword: string;
  validRandomPass: string;
  invalidEmailAdress: string;
  invalidPassNoDigit: string;
  invalidPassLessThan8Characters: string;
  invalidPassNoUppercaseLetter: string;
  firstName: string;
  lastName: string;
  organisationName: string;
  correctUserEmail1: string;
  correctUserEmail2: string;
  emptyString: string;
  digitInString: string;
  emailFirstPart: string;
  emailLastPart: string;
  taskDescription: string;
  projectName: string;
  taskDuration: string;
}

const credentials: credentials = {
  validEmailAdress: process.env.VALID_USERNAME,
  validPassword: process.env.VALID_PASS,
  validRandomPass: "test",
  invalidEmailAdress: "invalidEmail.com",
  invalidPassNoDigit: "InvalidPassword",
  invalidPassLessThan8Characters: "Xxx294",
  invalidPassNoUppercaseLetter: "invalidpassword123",
  firstName: "Firstname",
  lastName: "Lastname",
  organisationName: "Organisationname",
  correctUserEmail1: process.env.CORRECT_USER_EMAIL_1,
  correctUserEmail2: process.env.CORRECT_USER_EMAIL_2,
  emptyString: "",
  digitInString: "test1",
  emailFirstPart: process.env.EMAIL_FIRST_PART,
  emailLastPart: "@gmail.com",
  taskDescription: "Testowy task",
  projectName: "Testowa nazwa taska",
  taskDuration: "2",
};

export default credentials;
