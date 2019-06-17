import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
export const formControls = [
  {
    controlId: "formGroupName",
    icon: "fa fa-user",
    type: "text",
    placeholder: "Full name",
    name: "fullname",
    key: 3.7 / Math.random(),
    required: true
  },
  {
    controlId: "formGroupEmail",
    icon: "fa fa-envelope",
    type: "email",
    placeholder: "Email",
    name: "email",
    key: 3.7 / Math.random(),
    required: true
  },
  {
    controlId: "formGroupPhone",
    icon: "fa fa-phone-square",
    type: "number",
    placeholder: "Phone",
    name: "phone",
    key: 3.7 / Math.random(),
    required: true
  },
  {
    controlId: "formGroupAddress",
    icon: "fa fa-map-marker",
    type: "text",
    placeholder: "Address",
    name: "address",
    key: 3.7 / Math.random(),
    required: true
  },
  {
    controlId: "formGroupOccupation",
    icon: "fa fa-vcard",
    type: "text",
    placeholder: "Occupation",
    name: "occupation",
    key: 3.7 / Math.random()
  },
  {
    controlId: "formGroupFacebook",
    icon: "fa fa-facebook-official",
    type: "text",
    placeholder: "Facebook",
    name: "facebook",
    key: 3.7 / Math.random()
  },
  {
    controlId: "formGroupTwitter",
    icon: "fa fa-twitter",
    type: "text",
    placeholder: "Twitter",
    name: "twitter",
    key: 3.7 / Math.random()
  },
  {
    controlId: "formGroupLinkedIn",
    icon: "fa fa-linkedin-square",
    type: "text",
    placeholder: "LinkedIn",
    name: "linkedIn",
    key: 3.7 / Math.random()
  }
];

export const initialFormState = {
  email: "",
  fullname: "",
  address: "",
  phone: "",
  facebook: "",
  twitter: "",
  linkedIn: "",
  occupation: ""
};

export const ignoreList = [
  "_id",
  "createdAt",
  "updatedAt",
  "__v",
  "facebook",
  "twitter",
  "linkedIn"
];

export const addModalButtons = closeHandler => [
  {
    variant: "secondary",
    key: "close-form",
    text: "Close",
    type: "button",
    onClick: closeHandler
  },
  {
    variant: "success",
    key: "save-profile",
    text: "Save",
    type: "submit"
  }
];

export const navProps = [
  {
    type: "profileTab",
    payload: { profileActive: true, editActive: false },
    hash: "#profile",
    text: "Profile",
    activeType: "profileActive",
    key: "profileNav"
  },
  {
    type: "editTab",
    payload: { profileActive: false, editActive: true },
    hash: "#edit",
    text: "Edit",
    activeType: "editActive",
    key: "editNav"
  }
];

export const socialIcons = [
  { service: "facebook", icon: "fa-facebook-official", key: "fb" },
  { service: "twitter", icon: "fa-twitter", key: "twit" },
  { service: "linkedIn", icon: "fa-linkedin-square", key: "linkd" }
];
