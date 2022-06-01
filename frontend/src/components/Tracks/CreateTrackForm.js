// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { createTrack, getTracks } from "../../store/tracks";
// import { ValidationError } from "../utils/validationError";
// import ErrorMessage from "./ErrorMessage";

// const CreateTrackForm = ({hideForm}) => {
//     const [errorMessages, setErrorMessages] = useState({});
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const [name, setName] = useState("")
//     const [address, setAddress] = useState("")
//     const [city, setCity] = useState("")
//     const [state, setState] = useState("")
//     const [country, setCountry] = useState("USA")
//     const [phone, setPhone] = useState("(111) 111-1111")
//     const [web, setWeb] = useState("")
//     const [price, setPrice] = useState(0.00)

//     const updateName = e => setName(e.target.value);
//     const updateAddress = e => setAddress(e.target.value)
//     const updateCity = e => setCity(e.target.value)
//     const updateState = e => setState(e.target.value)
//     const updateCountry = e => setCountry(e.target.value)
//     const updatePhone = e => setPhone(e.target.value)
//     const updateWeb = e => setWeb(e.target.value)
//     const updatePrice = e => setPrice(e.target.value)

//     const handleSubmit = async(e) => {
//         e.preventDefault();

//         const payload = {
//             name, address, city, state, country, phone, web, price
//         }

//         let createdTrack;
//         try {
//             console.log('COMPONENT TRY BLOCK - BEFORE DISPATCH - THIS IS PAYLOAD', payload)
//             createdTrack = await dispatch(createTrack(payload))
//         } catch (error) {
//             if(error instanceof ValidationError) setErrorMessages(error.errors)
//             else setErrorMessages({ overall: error.toString().slice(7)})
//         }
//         if (createdTrack) {
//             setErrorMessages({});
//             history.pushState(`/tracks/${createdTrack.id}`)
//             hideForm;
//         }
//     }

//     const handleCancelClick = e => {
//         e.preventDefault();
//         setErrorMessages({});
//         hideForm();
//     }


//     useEffect(() => {
//         dispatch()
//     })
//     return (
//         <section className="track-from-holder">
//             <ErrorMessage message={errorMessages.overall} />
//             <form className="create-track-form" onSubmit={handleSubmit}>
//                 <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={setName}
//                 />
//                 <input
//                 type="text"
//                 placeholder="Address"
//                 value={address}
//                 onChange={setAddress}
//                 />
//                 <input
//                 type="text"
//                 placeholder="City"
//                 value={city}
//                 onChange={setCity}
//                 />
//                 <input
//                 type="text"
//                 placeholder="State"
//                 value={state}
//                 onChange={setState}
//                 />
//                 <input
//                 type="text"
//                 placeholder="Country"
//                 value={country}
//                 onChange={setCountry}
//                 />
//                 <input
//                 type="text"
//                 placeholder="(111) 111-1111"
//                 value={name}
//                 onChange={setPhone}
//                 />
//                 <input
//                 type="text"
//                 placeholder="Web Url"
//                 value={web}
//                 onChange={setWeb}
//                 />
//                 <input
//                 type="text"
//                 placeholder="0.00"
//                 value={price}
//                 onChange={setPrice}
//                 />
//                 <button type="submit">Add Track</button>
//                 <button type="button" onClick={handleCancelClick}>Cancel</button>
//             </form>
//         </section>
//     )
// }

// export default CreateTrackForm
