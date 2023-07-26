import { ToastContainer } from "react-toastify";
import { AutoSaveForm } from "./components/AutoSaveForm";
import "react-toastify/dist/ReactToastify.css";

function page() {
  return (
    <div className="bg-blue-50 p-8">
      <AutoSaveForm />
      <ToastContainer />
    </div>
  );
}

export default page;
