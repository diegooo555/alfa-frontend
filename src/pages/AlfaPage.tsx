import MenuTaskPage from "../components/Menu";

function AlfaPage() {
  return (
    <>
      <MenuTaskPage />
      <main className="m-0 h-auto w-full top-0 left-0 overflow-x-hidden relative">
        <div className="w-full absolute top-[40%] text-center">
          <h1 className="itim-regular text-white max-sm:text-2xl max-xl:text-4xl max-2xl:text-7xl">
            ALFA SYSTEM
          </h1>
        </div>
        <video src="/mountains.mp4" className="w-full" autoPlay muted loop />
      </main>
    </>
  );
}

export default AlfaPage;
