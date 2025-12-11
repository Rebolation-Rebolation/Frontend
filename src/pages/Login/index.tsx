import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import "./style.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login, register, isLoading, error, clearError } = useAuth();
  const { showError, showSuccess } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (error) {
      showError(error);
      clearError();
    }
  }, [error, showError, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isLogin && !formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "E-mail inválido";
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "As senhas não coincidem";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        showSuccess("Login realizado com sucesso!");
        navigate("/");
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        showSuccess("Conta criada com sucesso!");
        navigate("/");
      }
    } catch (err) {
      // Erro já é tratado pelo hook e exibido via toast
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h1>
          <p className="login-subtitle">
            {isLogin
              ? "Entre para continuar acompanhando seus campeonatos"
              : "Cadastre-se para começar a acompanhar seus campeonatos favoritos"}
          </p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`login-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite seu nome completo"
                className={formErrors.name ? "error" : ""}
                required={!isLogin}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu e-mail"
              className={formErrors.email ? "error" : ""}
              required
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              className={formErrors.password ? "error" : ""}
              required
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua senha"
                className={formErrors.confirmPassword ? "error" : ""}
                required={!isLogin}
              />
              {formErrors.confirmPassword && (
                <span className="error-message">{formErrors.confirmPassword}</span>
              )}
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Esqueci minha senha
              </Link>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 20 20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="50.27"
                    strokeDashoffset="25.13"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 10 10"
                      to="360 10 10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
                {isLogin ? "Entrando..." : "Cadastrando..."}
              </>
            ) : (
              isLogin ? "Entrar" : "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

