import "./footer.css";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="footer-contenedor">
        <article>
          <h3 className="footer-contactanos"></h3>
          <ul className="footer-contenido">
            <li>Contactanos</li>
            <li>uniminuto</li>
            <li>Bogota +57 (313) 2893595</li>
            <li>Linea Gratuita +57 (311) 8662259</li>
            <li>lcsalazar08@gmail.com</li>
            <li>ds.sebas21@gmail.com</li>
          </ul>
        </article>
        <h4 className="footer-contenido">
          producto original evaluado y financiado por uniminuto
          <br />
          INGENIERIA DE SISTEMAS <br /> 1/06/2025
        </h4>
      </div>
    </div>
  );
}

export default Footer;
