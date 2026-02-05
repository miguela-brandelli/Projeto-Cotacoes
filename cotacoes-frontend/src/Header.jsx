import React from "react";


function Header() {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.title}>Sistema de Cotações</h1>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#000", 
  },
  logo: {
    height: "40px", 
    marginRight: "10px",
  },
  title: {
    color: "#0055ff", 
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Header;