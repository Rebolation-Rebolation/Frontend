import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { GoldenMedal } from "../../assets/constants/medals/GoldenMedal";
import { SilverMedal } from "../../assets/constants/medals/SilverMedal";
import { BronzeMedal } from "../../assets/constants/medals/BronzeMedal";
import { useTeams } from "../../hooks/useTeams";
import { useChampionships } from "../../hooks/useChampionships";
import { useEnrollments } from "../../hooks/useEnrollments";
import { useTrophies } from "../../hooks/useTrophies";
import { useSportCategories } from "../../hooks/useSportCategories";
import { useToast } from "../../hooks/useToast";
import type { Team, Championship, Trophy } from "../../types/api";
import type { SportCategory } from "../../types/api";

export const MyTeam = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { teams, isLoading: teamsLoading, createTeam, updateTeam, deleteTeam } = useTeams();
  const { fetchAvailable, fetchChampionships, championships } = useChampionships();
  const { enroll, isLoading: enrollLoading } = useEnrollments();
  const { categories } = useSportCategories();
  
  const [team, setTeam] = useState<Partial<Team & { category: SportCategory }>>({
    name: "",
    logo: null,
    description: "",
    category: categories[0],
  });

  const [availableChampionships, setAvailableChampionships] = useState<Championship[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtrar campeonatos ativos dos campeonatos carregados
  const activeChampionships = championships.filter((c) => c.status === 'ativo');

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualizar time quando teams mudar
  useEffect(() => {
    if (teams.length > 0 && !team.id) {
      const firstTeam = teams[0];
      setTeam({
        ...firstTeam,
        category: firstTeam.category || categories[0],
      });
    } else if (teams.length === 0) {
      // Resetar formulário se não houver times
      setTeam({
        name: "",
        logo: null,
        description: "",
        category: categories[0],
      });
    }
  }, [teams, categories]);

  const loadInitialData = async () => {
    try {
      // Carregar campeonatos disponíveis
      const available = await fetchAvailable();
      setAvailableChampionships(available);

      // Carregar campeonatos ativos (onde o time está inscrito)
      await fetchChampionships({ status: 'ativo' });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const { trophies: teamTrophies } = useTrophies(team?.id);
  
  useEffect(() => {
    if (teamTrophies) {
      setTrophies(teamTrophies);
    }
  }, [teamTrophies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: SportCategory) => {
    setTeam((prev) => ({ ...prev, category, categoryId: category.id }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aqui você faria upload para um serviço externo e receberia a URL
      // Por enquanto, vamos usar base64 como exemplo
      const reader = new FileReader();
      reader.onloadend = () => {
        // Em produção, você enviaria o arquivo para um serviço de upload
        // e receberia a URL. Por enquanto, usamos base64 como placeholder
        const imageUrl = reader.result as string;
        setTeam((prev) => ({ ...prev, logo: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setTeam((prev) => ({ ...prev, logo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!team.name?.trim()) {
      showError("Nome do time é obrigatório");
      return;
    }

    if (!team.categoryId) {
      showError("Selecione uma categoria esportiva");
      return;
    }

    setIsSaving(true);
    try {
      if (team.id) {
        await updateTeam(team.id, {
          name: team.name,
          logo: team.logo || null,
          description: team.description || null,
          categoryId: team.categoryId,
        });
        showSuccess("Time atualizado com sucesso!");
      } else {
        const newTeam = await createTeam({
          name: team.name,
          logo: team.logo || null,
          description: team.description || null,
          categoryId: team.categoryId!,
        });
        setTeam(newTeam);
        showSuccess("Time criado com sucesso!");
      }
    } catch (error: any) {
      showError(error.message || "Erro ao salvar time");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeam = async () => {
    if (!team.id) return;

    try {
      await deleteTeam(team.id);
      showSuccess("Time excluído com sucesso!");
      setShowDeleteModal(false);
      navigate("/");
    } catch (error: any) {
      showError(error.message || "Erro ao excluir time");
    }
  };

  const handleEnroll = async (championshipId: string) => {
    if (!team.id) {
      showError("Você precisa criar um time primeiro");
      return;
    }

    try {
      await enroll(championshipId, team.id);
      showSuccess("Time inscrito com sucesso!");
      
      // Atualizar listas
      const updatedAvailable = availableChampionships.filter((c) => c.id !== championshipId);
      setAvailableChampionships(updatedAvailable);
      
      // Recarregar campeonatos para atualizar lista de ativos
      await fetchChampionships({ status: 'ativo' });
    } catch (error: any) {
      showError(error.message || "Erro ao inscrever time");
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      "ativo": "Em andamento",
      "inscricoes_abertas": "Inscrições Abertas",
      "inscricoes_encerradas": "Inscrições Encerradas",
      "aguardando_inicio": "Aguardando início",
      "finalizado": "Finalizado",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      "ativo": "status-active",
      "inscricoes_abertas": "status-open",
      "inscricoes_encerradas": "status-closed",
      "aguardando_inicio": "status-waiting",
      "finalizado": "status-finished",
    };
    return classes[status] || "status-available";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const RenderMedal = ({ position }: { position: number }) => {
    if (position === 1) return <GoldenMedal />;
    if (position === 2) return <SilverMedal />;
    if (position === 3) return <BronzeMedal />;
    return null;
  };

  const filteredAvailableChampionships = filterCategory === "all"
    ? availableChampionships
    : availableChampionships.filter((c) => c.categoryId === filterCategory);

  if (teamsLoading) {
    return (
      <div className="my-team-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Carregando dados do time...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-team-container">
      <div className="my-team-header">
        <h1 className="my-team-title">Meu Time</h1>
        <p className="my-team-subtitle">Gerencie todas as informações do seu time esportivo</p>
      </div>

      <div className="my-team-content">
        {/* Seção: Identidade do Time */}
        <section className="my-team-section">
          <h2 className="section-title">Identidade do Time</h2>
          <div className="team-identity">
            <div className="logo-upload-section">
              <div className="logo-preview">
                {team.logo ? (
                  <>
                    <img src={team.logo} alt="Logo do time" />
                    <button
                      type="button"
                      className="remove-logo-btn"
                      onClick={handleRemoveLogo}
                      aria-label="Remover logo"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M15 5L5 15M5 5l10 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="logo-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                        fill="#A6A9B8"
                      />
                    </svg>
                    <span>Logo do time</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="logo-input"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="upload-logo-btn">
                {team.logo ? "Trocar logo" : "Adicionar logo"}
              </label>
            </div>

            <div className="team-form-fields">
              <div className="form-group">
                <label htmlFor="team-name">Nome do Time *</label>
                <input
                  type="text"
                  id="team-name"
                  name="name"
                  value={team.name || ""}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do seu time"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="team-description">Descrição (opcional)</label>
                <textarea
                  id="team-description"
                  name="description"
                  value={team.description || ""}
                  onChange={handleInputChange}
                  placeholder="Slogan ou breve bio do time..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção: Categoria Esportiva */}
        <section className="my-team-section">
          <h2 className="section-title">Categoria Esportiva</h2>
          {categories.length === 0 ? (
            <div className="empty-state">
              <p>Carregando categorias...</p>
            </div>
          ) : (
            <div className="category-selector">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`category-option ${team.categoryId === category.id ? "active" : ""}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Campeonatos Ativos */}
        <section className="my-team-section">
          <h2 className="section-title">Campeonatos Ativos</h2>
          {activeChampionships.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum campeonato ativo no momento</p>
            </div>
          ) : (
            <div className="championships-grid">
              {activeChampionships.map((championship) => (
                <div key={championship.id} className="championship-card">
                  <div className="championship-card-header">
                    {championship.image && (
                      <img
                        src={championship.image}
                        alt={championship.name}
                        className="championship-image"
                      />
                    )}
                    <span className={`championship-status ${getStatusClass(championship.status)}`}>
                      {getStatusLabel(championship.status)}
                    </span>
                  </div>
                  <div className="championship-card-content">
                    <h3 className="championship-name">{championship.name}</h3>
                    <div className="championship-dates">
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M12 2.667H4a1.333 1.333 0 0 0-1.333 1.333v8a1.333 1.333 0 0 0 1.333 1.333h8a1.333 1.333 0 0 0 1.333-1.333V4a1.333 1.333 0 0 0-1.333-1.333ZM10.667 1.333V4M5.333 1.333V4M2.667 6.667h10.666"
                            stroke="#A6A9B8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Início: {formatDate(championship.startDate)}</span>
                      </div>
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M12 2.667H4a1.333 1.333 0 0 0-1.333 1.333v8a1.333 1.333 0 0 0 1.333 1.333h8a1.333 1.333 0 0 0 1.333-1.333V4a1.333 1.333 0 0 0-1.333-1.333ZM10.667 1.333V4M5.333 1.333V4M2.667 6.667h10.666"
                            stroke="#A6A9B8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Fim: {formatDate(championship.endDate)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="championship-details-btn"
                    onClick={() => navigate(`/championships-settings?id=${championship.id}`)}
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Campeonatos Disponíveis */}
        <section className="my-team-section">
          <div className="section-header-with-filter">
            <h2 className="section-title">Campeonatos Disponíveis</h2>
            <div className="filter-group">
              <label htmlFor="category-filter">Filtrar por categoria:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todas</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {filteredAvailableChampionships.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum campeonato disponível no momento</p>
            </div>
          ) : (
            <div className="championships-grid">
              {filteredAvailableChampionships.map((championship) => (
                <div key={championship.id} className="championship-card">
                  <div className="championship-card-header">
                    {championship.image && (
                      <img
                        src={championship.image}
                        alt={championship.name}
                        className="championship-image"
                      />
                    )}
                  </div>
                  <div className="championship-card-content">
                    <h3 className="championship-name">{championship.name}</h3>
                    {championship.rules && (
                      <div className="championship-rules">
                        <strong>Regras principais:</strong>
                        <p>{championship.rules}</p>
                      </div>
                    )}
                    <div className="championship-dates">
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M12 2.667H4a1.333 1.333 0 0 0-1.333 1.333v8a1.333 1.333 0 0 0 1.333 1.333h8a1.333 1.333 0 0 0 1.333-1.333V4a1.333 1.333 0 0 0-1.333-1.333ZM10.667 1.333V4M5.333 1.333V4M2.667 6.667h10.666"
                            stroke="#A6A9B8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Início: {formatDate(championship.startDate)}</span>
                      </div>
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 1.333v6.667M8 14.667A6.667 6.667 0 1 0 8 1.333Z"
                            stroke="#A6A9B8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Inscrições até: {formatDate(championship.registrationEndDate)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="championship-enroll-btn"
                    onClick={() => handleEnroll(championship.id)}
                    disabled={enrollLoading || !team.id}
                  >
                    {enrollLoading ? "Inscrevendo..." : "Inscrever"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Troféus e Conquistas */}
        <section className="my-team-section">
          <h2 className="section-title">Troféus e Conquistas</h2>
          {trophies.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum troféu conquistado ainda</p>
            </div>
          ) : (
            <div className="trophies-grid">
              {trophies.map((trophy) => (
                <div key={trophy.id} className="trophy-card">
                  <div className="trophy-icon">
                    <RenderMedal position={trophy.position} />
                  </div>
                  <div className="trophy-content">
                    <h3 className="trophy-championship">
                      {trophy.championship?.name || "Campeonato"}
                    </h3>
                    <p className="trophy-year">{trophy.year}</p>
                    <div className="trophy-stats">
                      <div className="stat-item">
                        <span className="stat-label">Vitórias:</span>
                        <span className="stat-value">{trophy.wins}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Derrotas:</span>
                        <span className="stat-value">{trophy.losses}</span>
                      </div>
                      {trophy.draws !== null && trophy.draws !== undefined && (
                        <div className="stat-item">
                          <span className="stat-label">Empates:</span>
                          <span className="stat-value">{trophy.draws}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Ações Gerais */}
        <section className="my-team-section actions-section">
          <div className="actions-buttons">
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
              disabled={isSaving || !team.name}
            >
              {isSaving ? (
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
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </button>
            {team.id && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Excluir time
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}></div>
          <div className="delete-modal">
            <h3 className="modal-title">Confirmar exclusão</h3>
            <p className="modal-message">
              Tem certeza que deseja excluir seu time? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="modal-confirm-btn"
                onClick={handleDeleteTeam}
              >
                Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
