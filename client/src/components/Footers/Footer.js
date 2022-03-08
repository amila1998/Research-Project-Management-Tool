import React from "react";
import "./footers.css";
import MyClock from "../clock/clock";
import MyCalander from "../calander/calander";
export default function Footer() {
  return (
    <>
 <footer class="footer shadow-lg">


  	 <div class="container">
       
  	 	<div class="row justify-content-around">
  	 		<div class="footer-col">
  	 			<h4>Sections</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 				<li><a href="#">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 		<MyClock/>
  	 		</div>
  	 	
  	 		<div class="footer-col">
  	 		<MyCalander/>
  	 		</div>
  	 	</div>
       <hr/>
       <div class="row justify-content-around">
  	 		<div class="footer-col">
         <h5>Copyright 222 © SLIIT-AF. All Rights Reserved.</h5>
  	 		</div>
  	 	
  	 	
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="#"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i class="fab fa-twitter"></i></a>
  	 				<a href="#"><i class="fab fa-instagram"></i></a>
  	 				<a href="#"><i class="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>

    </>
  );
}
