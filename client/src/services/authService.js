import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please enter all fields.");
    }
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error.message);
  }
};

export const handleRegister = (
  e,
  role,
  name,
  email,
  phone,
  organisationName,
  address,
  hospitalName,
  website,
  password
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        role,
        name,
        email,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
        password,
      })
    );
  } catch (error) {
    alert(error.message);
  }
};
