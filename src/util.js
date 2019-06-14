import toastr from "toastr";

export const handleErrors = ({ response, message }) => {
  const error = response && response.data;
  if (error && error.errors) {
    return error.errors.forEach(error => toastr.error(error));
  }
  if (error) return toastr.error(error.message);
  toastr.error(message);
};
