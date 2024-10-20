import { Articles } from "./container/Articles";
import { MainLayout } from "../../components"

export const Blogs = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-tr from-cyan-100 to-indigo-200 relative overflow-hidden min-h-screen">

        <Articles />
      </div>
    </MainLayout>
  );
};
