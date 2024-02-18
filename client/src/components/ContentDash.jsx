
const ContentDash = () => {
  return (
    <>
      <div className="p-3">
        <h1 className="text-2xl font-bold lg:justify-center">Todos los Contratos</h1>
        <div className="flex flex-col sm:flex-row lg:w-11/12 p-3  flex-wrap gap-3">

          <div className="flex bg-white shadow-md rounded-md p-4 flex-col">
            <h1 className="text-lg font-bold  text-center pb-3">Arina</h1>
            <img src="/materia/vegetal.jpeg" alt="" className="w-full h-40 object-cover rounded-md pb-3" />
            <div className="pb-3">
              <p><span className="font-bold">Fecha de Creacion:</span> 2023-01-01 </p>
              <p><span className="font-bold">Periodo de Validez:</span> until 2025 </p>
            </div>
            <div className="flex-col gap-3 ">
              <button className=" mb-3 w-full bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                ver Compra
              </button>
              <button className=" w-full bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                Ver Informe
              </button>
            </div>
          </div>





          {/* END  */}
        </div>
      </div>
    </>
  )
};

export default ContentDash;
