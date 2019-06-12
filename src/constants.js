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
    type: "text",
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
