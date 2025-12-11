import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./style.css";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    console.log("Senha redefinida:", { token, password: formData.password });
    // Aqui você pode adicionar a lógica de redefinição de senha
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="reset-password-header">
            <div className="success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#032230" strokeWidth="2" />
                <path
                  d="M8 12l2 2 4-4"
                  stroke="#032230"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="reset-password-title">Senha redefinida!</h1>
            <p className="reset-password-subtitle">
              Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
            </p>
          </div>
          <div className="reset-password-actions">
            <Link to="/login" className="back-to-login-button">
              Ir para o login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h1 className="reset-password-title">Redefinir senha</h1>
          <p className="reset-password-subtitle">
            Digite sua nova senha abaixo. Certifique-se de que ela seja segura e fácil de lembrar.
          </p>
        </div>

        <form className="reset-password-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="password">Nova senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua nova senha"
              required
              minLength={6}
            />
            <span className="form-hint">Mínimo de 6 caracteres</span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar nova senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua nova senha"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="submit-button">
            Redefinir senha
          </button>
        </form>

        <div className="reset-password-footer">
          <Link to="/login" className="back-to-login-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};




