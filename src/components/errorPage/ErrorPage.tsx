import "./errorPageStyle.css";
type ErrorProps = {
  error: string;
};
export default function ErrorPage({ error } : ErrorProps) {
  return (
    <div>
      <section id="not-found">
        <div className="circles">
          <p>
            {error}
            <br />
          </p>
          <span className="circle big"></span>
          <span className="circle med"></span>
          <span className="circle small"></span>
        </div>
      </section>
    </div>
  );
}
