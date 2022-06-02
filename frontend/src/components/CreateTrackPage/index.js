import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './CreateTrackFormPage.css'
import * as sessionActions from "../../store/session";
import * as trackActions from "../../store/tracks"
// import ValidationError from "frontend/src/utils/validationError.js"
import ErrorMessage from "../ErrorMessage";
import {createTrack} from "../../store/tracks"

function CreateTrackFormPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const track = useSelector((state) => state.track)
    const history = useHistory()
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [web, setWeb] = useState("");
    const [price, setPrice] = useState(0.00);
    const [errors, setErrors] = useState([]);
    const [errorMessages, setErrorMessages] = useState({})
    const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updatePhone = (e) => setPhone(e.target.value);
  const updateWeb = (e) => setWeb(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  if (!sessionUser) return <Redirect to="/" />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors([]);
//       return dispatch(sessionActions.signup({ email, username, password }))
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) setErrors(data.errors);
//         });
//     }
//     return setErrors(['Confirm Password field must be the same as the Password field']);
//   };
    const handleSubmit = async (e) => {
       const payload = {
           name, address, city, state, country, phone, web, price
       }
       let createdTrack;
       try {
           createdTrack = dispatch(createTrack(payload))
       } catch (error) {
        if(error) setErrorMessages(error.errors);
        else setErrorMessages({ overall: error.toString().slice(7) });
       }
       if (createdTrack) {
        setErrorMessages({});
        history.push(`/tracks/${createdTrack.id}`);

      }
    }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
          required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={updateAddress}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={updateState}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
          required
        />
      </label>
      <label>
        Phone
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={updatePhone}
          required
        />
      </label>
      <label>
        Web
        <input
          type="text"
          placeholder="Url"
          value={web}
          onChange={updateWeb}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={updatePrice}
          required
        />
      </label>
      <button type="submit">Add Track</button>
    </form>
  );
}

export default CreateTrackFormPage;
