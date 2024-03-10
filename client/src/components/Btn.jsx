export default function Btn({disabled, type,label,color}) {
  return (
    <button disabled={disabled} type={type} className={`${color} text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}>{
        label
    }</button>
  )
}