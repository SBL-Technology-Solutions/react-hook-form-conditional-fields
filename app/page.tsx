import { ToastContainer } from "react-toastify";
import { AutoSaveForm } from "./components/AutoSaveForm";
import "react-toastify/dist/ReactToastify.css";
import { AutoSaveFormTest } from "./components/AutoSaveFormTest";

function page() {
  return (
    <div className="bg-slate-800 p-8">
      {/* <AutoSaveForm /> */}
      <AutoSaveFormTest />
      <ToastContainer />
    </div>
  );
}

export default page;
