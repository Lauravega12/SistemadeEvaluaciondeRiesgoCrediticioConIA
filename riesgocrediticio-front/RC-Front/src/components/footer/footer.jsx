import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Sección de contacto */}
        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <div className="contact-info">
            <p className="contact-item">UNIMINUTO - Bogotá</p>
            <p className="contact-item">Tel: +57 (313) 289-3595</p>
            <p className="contact-item">Línea Gratuita: +57 (311) 866-2259</p>
            <p className="contact-item">lcsalazar08@gmail.com</p>
            <p className="contact-item">ds.sebas21@gmail.com</p>
          </div>
        </div>

        {/* Sección de información del proyecto */}
        <div className="footer-section">
          <h3 className="footer-title">Información del Proyecto</h3>
          <div className="project-info">
            <p className="project-description">
              Producto original evaluado y financiado por UNIMINUTO
            </p>
            <p className="program">INGENIERÍA DE SISTEMAS</p>
            <p className="date">1/06/2025</p>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <hr className="footer-divider" />

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 UNIMINUTO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
