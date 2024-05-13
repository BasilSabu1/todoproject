import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

function Footer() {
  return (
    <div className="footer p-4 " style={{ background: '#f0f0f0', position: 'relative', bottom: '0', width: '100%' }}>
      <div className="row">
        <div className="row ">
          <div className="col-md-12 text-center d-flex justify-content-between">
            <p>Get connected with us on social network</p>
            <div className="icons d-flex gap-3">
              <i className="bi bi-github"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <hr />
        </div>
        <div className="col-md-3">
          <div className="logo">
          </div>
          <div className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Products</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Angular</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>React</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Vue</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Laravel</Link></li>
          </ul>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Useful Links</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Pricing</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Settings</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Order</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Help</Link></li>
          </ul>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Contact</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-geo-alt"></i>  123 Street, City</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-telephone"></i>  123-456-7890</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-envelope"></i> info@example.com</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-printer"></i>  123-456-7890</Link></li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12 text-center">
          &copy; copyright 2023 project fair
        </div>
      </div>
    </div>
  );
}

export default Footer;


