import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recuperação de senha solicitada para:", email);
    // Aqui você pode adicionar a lógica de envio de email
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
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
            <h1 className="forgot-password-title">Email enviado!</h1>
            <p className="forgot-password-subtitle">
              Enviamos um link de recuperação para <strong>{email}</strong>
            </p>
            <p className="forgot-password-subtitle">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
          </div>
          <div className="forgot-password-actions">
            <Link to="/login" className="back-to-login-button">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h1 className="forgot-password-title">Esqueceu sua senha?</h1>
          <p className="forgot-password-subtitle">
            Não se preocupe! Digite seu e-mail e enviaremos um link para você redefinir sua senha.
          </p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Enviar link de recuperação
          </button>
        </form>

        <div className="forgot-password-footer">
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




