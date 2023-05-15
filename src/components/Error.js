import React from "react";
import { toast } from "react-toastify";
// -----------------------
function Error({ error, toastmessage }) {
  //? React toastify...
  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // console.log(toastmessage);
  if (toastmessage !== "") {
    toast.error(toastmessage, toastOptions);
  }
  // -----------------------
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );
}
export default Error;
