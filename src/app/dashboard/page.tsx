import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

const Dashboard = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/character-list");
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Sagara Technology</h1>
        <h2 className="text-xl font-semibold">Front-End Engineer</h2>
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-2 justify-center py-3 px-6 rounded-2xl bg-white text-black font-bold border-2 border-white hover:bg-gray-500 hover:text-white transition-all duration-100">
          View Character List
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
