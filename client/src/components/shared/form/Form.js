import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login") {
            return handleLogin(e, role, email, password);
          } else if (formType === "register") {
            return handleRegister(
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
            );
          }
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value={"donor"}
              onChange={(e) => setRole(e.target.value)}
              id="donorRadio"
              defaultChecked
            />
            <label class="form-check-label">Donor</label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
              id="adminRadio"
            />
            <label class="form-check-label">Admin</label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
              id="hospitalRadio"
            />
            <label class="form-check-label">Hospital</label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
              id="organisationRadio"
            />
            <label class="form-check-label">Organisation</label>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === "login":
              return (
                <>
                  <InputType
                    name={"email"}
                    inputType={"email"}
                    labelText={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    name={"password"}
                    inputType={"password"}
                    labelText={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            case formType === "register":
              return (
                <>
                  <InputType
                    name={"email"}
                    inputType={"email"}
                    labelText={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    name={"password"}
                    inputType={"password"}
                    labelText={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {(role === "admin" || role === "donor") && (
                    <InputType
                      name={"name"}
                      inputType={"text"}
                      labelText={"Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}

                  {role === "organisation" && (
                    <InputType
                      name={"organisationName"}
                      inputType={"text"}
                      labelText={"Organisation Name"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      name={"hospitalName"}
                      inputType={"text"}
                      labelText={"Hospital Name"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    name={"website"}
                    inputType={"text"}
                    labelText={"Website Name"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    name={"address"}
                    inputType={"text"}
                    labelText={"Address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    name={"phone"}
                    inputType={"text"}
                    labelText={"Phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not Registered Yet ? Register
              <Link to="/register"> Here !</Link>
            </p>
          ) : (
            <p>
              Already have an acccount Please
              <Link to="/login"> Login</Link>
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
