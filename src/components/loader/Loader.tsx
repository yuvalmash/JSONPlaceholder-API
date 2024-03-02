import "./loader.css";
type LoaderProps = {
  typeOfLoader?: "main";
};
export default function Loader({ typeOfLoader }: LoaderProps) {
  const style: object = findLoaderSize(typeOfLoader);

  function findLoaderSize(typeOfLoader: string | undefined): object {
    switch (typeOfLoader) {
      case "main":
        return { width: "320px", height: "320px" };
      default:
        return { width: "10px", height: "10px" };
    }
  }
  return (
    <div className="loader-container">
      <div className="loader" style={style}></div>
    </div>
  );
}
