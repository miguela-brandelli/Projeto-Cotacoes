import React from "react";
// import logo from "./cotacoes-backend/cotacoes-frontend/public/android-chrome-192x192.png"; // Substitua pelo caminho correto

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
    backgroundColor: "#000", // ou cor de fundo desejada
  },
  logo: {
    height: "40px", // ajuste o tamanho conforme o logo
    marginRight: "10px",
  },
  title: {
    color: "#8aff00", // ou branco, se quiser seguir o exemplo da Datachamp
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Header;