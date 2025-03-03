import { createNewUser, getUserByEmail, getUserSchoolName, NewUser, updateUser } from "@/data/user";
import bcrypt from "bcrypt";

export const createUserUseCase = async ({
  name, email, password, sharedPublicKey, sharedPrivateKey, encryptionKeyMain, encryptionKeyRecovery, schoolName
}: NewUser) => {


  const SALT_ROUNDS = 10;
  const userExists = await getUserByEmail(email);

  if (userExists) throw new Error("User Already Exists");

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const hashedSchoolName = bcrypt.hashSync(schoolName, SALT_ROUNDS)

  const userToCreate = {
    name,
    email,
    password: hashedPassword,
    schoolName: hashedSchoolName,
    sharedPublicKey,
    sharedPrivateKey,

    encryptionKeyMain,
    encryptionKeyRecovery
  };


  await createNewUser(userToCreate);
};



export const verifySchoolNameUseCase = async (email: string, schoolName: string) => {

  try {
    const userExists = await getUserSchoolName(email)

    if (!userExists) throw new Error("User not found")

    const isSchoolNameValid = await bcrypt.compare(schoolName, userExists.schoolName)

    if (!isSchoolNameValid) throw new Error("Invalid School Name")

    return {
      isValid : true
    }
  } catch (error : any ) {


    return {
      isValid : false,
      message : error.message
    }
  }


}

export const changePasswordUseCase = async (email : string, password : string) => {

  try {
    const userExists = await getUserByEmail(email)
    if (!userExists) throw new Error("User not found")


    const hashedPassword = bcrypt.hashSync(password, 10)

    
    await updateUser(email, hashedPassword)

    return {
      success : true
    }

  } catch (error : any ) {
    
    console.log({ changePasswordError : error });

    return {
      success : false,
      message : error.message
    }
    
  }

}