import { ToastContainer } from "react-toastify";
import { AutoSaveForm } from "./components/AutoSaveForm";
import "react-toastify/dist/ReactToastify.css";

function page() {
  return (
    <div className="bg-slate-800 p-8">
      <AutoSaveForm />
      <ToastContainer />
    </div>
  );
}

export default page;
