import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore, useForm, useLanguage } from "../hooks";

const initialFormValue = {
  email: "",
  password: "",
};

export const Login: React.FC = () => {
  const { email, password, onInputChange } = useForm(initialFormValue);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { startLogin } = useAuthStore();
  const { changeLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startLogin({ email, password });
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("Login")}</h2>
        <div className="mt-4">
          <label className="block text-gray-700">{t("Select Language")}</label>
          <select
            onChange={(e) => {
              changeLanguage(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">{t("Email")}</label>
            <input
              type="email"
              value={email}
              onChange={onInputChange}
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">{t("Password")}</label>
            <input
              type="password"
              value={password}
              onChange={onInputChange}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4"
          >
            {t("Login")}
          </button>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            {t("Go to Register")}
          </button>
        </form>
      </div>
    </div>
  );
};
