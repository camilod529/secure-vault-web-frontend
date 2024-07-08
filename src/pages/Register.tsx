import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../hooks";
import { useLanguage } from "../hooks/useLanguage"; // Importar el hook useLanguage

export const Register: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { startRegister } = useAuthStore();
  const { changeLanguage } = useLanguage(); // Obtener la función changeLanguage del hook useLanguage

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startRegister({ email, password, fullName });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("Register")}</h2>
        <div className="mt-4">
          <label className="block text-gray-700">{t("Select Language")}</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={(e) => {
              changeLanguage(e.target.value);
            }}
            value={i18n.language} // Asegúrate de que el select refleje el idioma actual
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">{t("Full name")}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("Email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">{t("Password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4"
          >
            {t("Register")}
          </button>
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 mb-4"
          >
            {t("Go to Login")}
          </button>
        </form>
      </div>
    </div>
  );
};
