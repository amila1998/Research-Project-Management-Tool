import React from "react";
import "./header.css"

export default function Header() {
  return (
    <>
      {/* Header */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    
    <a class="navbar-brand" href="#">
      <img src={require("../../assets/img/SLIIT_Logo_Crest.png")} alt="" width="40" height="45"/>
      Research Project Management Tool
    </a>

    <a class="navbar-brand" href="#"></a><br/>
    
      <form class="d-flex">
        <a class="nav-link active" aria-current="page" href="#">Name</a>
        <img src={require("../../assets/img/Default_Avatar.png")} class="rounded"  width="40" height="40" alt="..."></img>
      </form>
    </div>
 
</nav>
    </>
  );
}
