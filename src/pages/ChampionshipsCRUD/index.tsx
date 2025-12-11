import { useState, useRef, useEffect } from "react";
import "./style.css";
import { useChampionships } from "../../hooks/useChampionships";
import { useSportCategories } from "../../hooks/useSportCategories";
import { useEnrollments } from "../../hooks/useEnrollments";
import { useToast } from "../../hooks/useToast";
import type { Championship, DisputeType, ChampionshipStatus } from "../../types/api";
import type { SportCategory } from "../../types/api";

const DISPUTE_TYPES: { value: DisputeType; label: string }[] = [
  { value: "pontos_corridos", label: "Pontos Corridos" },
  { value: "mata_mata", label: "Mata-Mata" },
  { value: "grupos", label: "Grupos" },
  { value: "mista", label: "Mista" },
];

export const ChampionshipsCRUD = () => {
  const { showSuccess, showError } = useToast();
  const {
    championships,
    pagination,
    isLoading: championshipsLoading,
    fetchChampionships,
    getById,
    createChampionship,
    updateChampionship,
    deleteChampionship,
  } = useChampionships();
  const { categories } = useSportCategories();
  const { getByChampionship } = useEnrollments();

  const [currentView, setCurrentView] = useState<"list" | "form" | "details">("list");
  const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null);
  const [formData, setFormData] = useState<Partial<Championship & { category: SportCategory }>>({
    name: "",
    description: "",
    category: categories[0],
    categoryId: categories[0]?.id,
    image: null,
    startDate: "",
    endDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
    teamLimit: 16,
    rules: "",
    location: "",
    disputeType: "pontos_corridos",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [enrolledTeams, setEnrolledTeams] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar campeonatos ao montar o componente
  useEffect(() => {
    loadChampionships();
  }, []);

  // Atualizar categoria quando categories mudar
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
        categoryId: categories[0].id,
      }));
    }
  }, [categories]);

  const loadChampionships = async () => {
    const filters: any = {
      page: currentPage,
      limit: itemsPerPage,
    };
    if (searchTerm) filters.search = searchTerm;
    if (filterCategory !== "all") filters.categoryId = filterCategory;
    if (filterStatus !== "all") filters.status = filterStatus;

    await fetchChampionships(filters);
  };

  useEffect(() => {
    loadChampionships();
  }, [currentPage, searchTerm, filterCategory, filterStatus]);

  const totalPages = pagination?.totalPages || 1;
  const paginatedChampionships = championships;

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (category: SportCategory) => {
    setFormData((prev) => ({ ...prev, category, categoryId: category.id }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Nome do campeonato é obrigatório";
    }

    if (!formData.startDate) {
      errors.startDate = "Data de início é obrigatória";
    }

    if (!formData.endDate) {
      errors.endDate = "Data de término é obrigatória";
    }

    if (!formData.registrationStartDate) {
      errors.registrationStartDate = "Data de início das inscrições é obrigatória";
    }

    if (!formData.registrationEndDate) {
      errors.registrationEndDate = "Data de encerramento das inscrições é obrigatória";
    }

    if (formData.teamLimit < 2) {
      errors.teamLimit = "O limite mínimo de times é 2";
    }

    // Validações de datas
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        errors.endDate = "Data de término deve ser posterior à data de início";
      }
    }

    if (formData.registrationStartDate && formData.registrationEndDate) {
      if (new Date(formData.registrationStartDate) >= new Date(formData.registrationEndDate)) {
        errors.registrationEndDate = "Data de encerramento das inscrições deve ser posterior à data de início";
      }
    }

    if (formData.registrationEndDate && formData.startDate) {
      if (new Date(formData.registrationEndDate) > new Date(formData.startDate)) {
        errors.registrationEndDate = "As inscrições devem encerrar antes do início do campeonato";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      if (formData.id) {
        await updateChampionship(formData.id, {
          name: formData.name!,
          description: formData.description || null,
          image: formData.image || null,
          categoryId: formData.categoryId!,
          startDate: formData.startDate!,
          endDate: formData.endDate!,
          registrationStartDate: formData.registrationStartDate!,
          registrationEndDate: formData.registrationEndDate!,
          teamLimit: formData.teamLimit!,
          rules: formData.rules || null,
          location: formData.location || null,
          disputeType: formData.disputeType!,
        });
        showSuccess("Campeonato atualizado com sucesso!");
      } else {
        await createChampionship({
          name: formData.name!,
          description: formData.description || null,
          image: formData.image || null,
          categoryId: formData.categoryId!,
          startDate: formData.startDate!,
          endDate: formData.endDate!,
          registrationStartDate: formData.registrationStartDate!,
          registrationEndDate: formData.registrationEndDate!,
          teamLimit: formData.teamLimit!,
          rules: formData.rules || null,
          location: formData.location || null,
          disputeType: formData.disputeType!,
        });
        showSuccess("Campeonato criado com sucesso!");
      }
      handleCancel();
      await loadChampionships();
    } catch (error: any) {
      showError(error.message || "Erro ao salvar campeonato");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      category: categories[0],
      categoryId: categories[0]?.id,
      image: null,
      startDate: "",
      endDate: "",
      registrationStartDate: "",
      registrationEndDate: "",
      teamLimit: 16,
      rules: "",
      location: "",
      disputeType: "pontos_corridos",
    });
    setFormErrors({});
    setCurrentView("list");
    setSelectedChampionship(null);
  };

  const handleEdit = async (id: string) => {
    try {
      const championship = await getById(id);
      setFormData({
        ...championship,
        category: championship.category || categories[0],
        categoryId: championship.categoryId,
      });
      setCurrentView("form");
    } catch (error: any) {
      showError(error.message || "Erro ao carregar campeonato");
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const championship = await getById(id);
      setSelectedChampionship(championship);
      
      // Carregar times inscritos
      const enrollments = await getByChampionship(id);
      setEnrolledTeams(enrollments);
      
      setCurrentView("details");
    } catch (error: any) {
      showError(error.message || "Erro ao carregar detalhes do campeonato");
    }
  };

  const handleDelete = async () => {
    if (deleteTargetId) {
      try {
        await deleteChampionship(deleteTargetId);
        showSuccess("Campeonato excluído com sucesso!");
        setShowDeleteModal(false);
        setDeleteTargetId(null);
        await loadChampionships();
      } catch (error: any) {
        showError(error.message || "Erro ao excluir campeonato");
      }
    }
  };

  const handleNewChampionship = () => {
    setFormData({
      name: "",
      description: "",
      category: categories[0],
      categoryId: categories[0]?.id,
      image: null,
      startDate: "",
      endDate: "",
      registrationStartDate: "",
      registrationEndDate: "",
      teamLimit: 16,
      rules: "",
      location: "",
      disputeType: "pontos_corridos",
    });
    setFormErrors({});
    setCurrentView("form");
  };

  const getStatusLabel = (status: ChampionshipStatus) => {
    const labels: Record<string, string> = {
      ativo: "Ativo",
      finalizado: "Finalizado",
      inscricoes_abertas: "Inscrições Abertas",
      inscricoes_encerradas: "Inscrições Encerradas",
      aguardando_inicio: "Aguardando Início",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: ChampionshipStatus) => {
    const classes: Record<string, string> = {
      ativo: "status-active",
      finalizado: "status-finished",
      inscricoes_abertas: "status-open",
      inscricoes_encerradas: "status-closed",
      aguardando_inicio: "status-waiting",
    };
    return classes[status] || "status-unknown";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Renderização
  if (currentView === "form") {
    return (
      <div className="championships-crud-container">

        <div className="crud-header">
          <div>
            <h1 className="crud-title">
              {formData.id ? "Editar Campeonato" : "Novo Campeonato"}
            </h1>
            <p className="crud-subtitle">
              {formData.id
                ? "Atualize as informações do campeonato"
                : "Preencha os dados para criar um novo campeonato"}
            </p>
          </div>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancelar
          </button>
        </div>

        <div className="crud-content">
          {/* Informações Gerais */}
          <section className="crud-section">
            <h2 className="section-title">Informações Gerais</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="name">Nome do Campeonato *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do campeonato"
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o campeonato..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoria Esportiva *</label>
                <div className="category-selector">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`category-option ${
                        formData.categoryId === category.id ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Logo do Campeonato</label>
                <div className="image-upload-section">
                  <div className="image-preview">
                    {formData.image ? (
                      <>
                        <img src={formData.image} alt="Preview" />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={handleRemoveImage}
                          aria-label="Remover imagem"
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
                      <div className="image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                            fill="#A6A9B8"
                          />
                        </svg>
                        <span>Logo do campeonato</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-image-btn">
                    {formData.image ? "Trocar imagem" : "Adicionar imagem"}
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Datas */}
          <section className="crud-section">
            <h2 className="section-title">Datas</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="registrationStartDate">Início das Inscrições *</label>
                <input
                  type="date"
                  id="registrationStartDate"
                  name="registrationStartDate"
                  value={formData.registrationStartDate}
                  onChange={handleInputChange}
                  className={formErrors.registrationStartDate ? "error" : ""}
                />
                {formErrors.registrationStartDate && (
                  <span className="error-message">{formErrors.registrationStartDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="registrationEndDate">Encerramento das Inscrições *</label>
                <input
                  type="date"
                  id="registrationEndDate"
                  name="registrationEndDate"
                  value={formData.registrationEndDate}
                  onChange={handleInputChange}
                  className={formErrors.registrationEndDate ? "error" : ""}
                />
                {formErrors.registrationEndDate && (
                  <span className="error-message">{formErrors.registrationEndDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Início do Campeonato *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={formErrors.startDate ? "error" : ""}
                />
                {formErrors.startDate && (
                  <span className="error-message">{formErrors.startDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Término do Campeonato *</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={formErrors.endDate ? "error" : ""}
                />
                {formErrors.endDate && (
                  <span className="error-message">{formErrors.endDate}</span>
                )}
              </div>
            </div>
          </section>

          {/* Configurações */}
          <section className="crud-section">
            <h2 className="section-title">Configurações</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="teamLimit">Limite de Times *</label>
                <input
                  type="number"
                  id="teamLimit"
                  name="teamLimit"
                  value={formData.teamLimit}
                  onChange={handleInputChange}
                  min="2"
                  className={formErrors.teamLimit ? "error" : ""}
                />
                {formErrors.teamLimit && (
                  <span className="error-message">{formErrors.teamLimit}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="disputeType">Tipo de Disputa *</label>
                <select
                  id="disputeType"
                  name="disputeType"
                  value={formData.disputeType || "pontos_corridos"}
                  onChange={handleInputChange}
                >
                  {DISPUTE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="location">Local ou Cidade (opcional)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: São Paulo, SP"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="rules">Regras Principais</label>
                <textarea
                  id="rules"
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="Descreva as regras principais do campeonato..."
                  rows={6}
                />
              </div>
            </div>
          </section>

          {/* Ações */}
          <section className="crud-section actions-section">
            <div className="actions-buttons">
              <button
                type="button"
                className="save-btn"
                onClick={handleSave}
                disabled={isSaving}
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
                  "Salvar Campeonato"
                )}
              </button>
              <button type="button" className="cancel-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (currentView === "details") {
    if (!selectedChampionship) return null;

    return (
      <div className="championships-crud-container">
        <div className="crud-header">
          <div>
            <button
              type="button"
              className="back-btn"
              onClick={() => setCurrentView("list")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10l5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Voltar
            </button>
            <h1 className="crud-title">{selectedChampionship.name}</h1>
            <p className="crud-subtitle">Detalhes completos do campeonato</p>
          </div>
          <div className="details-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleEdit(selectedChampionship.id!)}
            >
              Editar Campeonato
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                setDeleteTargetId(selectedChampionship.id!);
                setShowDeleteModal(true);
              }}
            >
              Excluir
            </button>
          </div>
        </div>

        <div className="crud-content">
          <div className="details-grid">
            <div className="details-main">
              <section className="crud-section">
                <div className="details-header">
                  {selectedChampionship.image && (
                    <img
                      src={selectedChampionship.image}
                      alt={selectedChampionship.name}
                      className="details-image"
                    />
                  )}
                  <div className="details-header-info">
                    <h2 className="section-title">{selectedChampionship.name}</h2>
                    <div className="details-meta">
                      <span className={`status-badge ${getStatusClass(selectedChampionship.status)}`}>
                        {getStatusLabel(selectedChampionship.status)}
                      </span>
                      <span className="category-badge">
                        {selectedChampionship.category?.icon} {selectedChampionship.category?.name}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedChampionship.description && (
                  <p className="details-description">{selectedChampionship.description}</p>
                )}
              </section>

              <section className="crud-section">
                <h2 className="section-title">Regras</h2>
                <div className="rules-content">
                  {selectedChampionship.rules ? (
                    <p className="rules-text">{selectedChampionship.rules}</p>
                  ) : (
                    <p className="empty-text">Nenhuma regra cadastrada</p>
                  )}
                </div>
              </section>

              <section className="crud-section">
                <h2 className="section-title">Datas</h2>
                <div className="dates-grid">
                  <div className="date-card">
                    <span className="date-label">Início das Inscrições</span>
                    <span className="date-value">
                      {formatDate(selectedChampionship.registrationStartDate)}
                    </span>
                  </div>
                  <div className="date-card">
                    <span className="date-label">Encerramento das Inscrições</span>
                    <span className="date-value">
                      {formatDate(selectedChampionship.registrationEndDate)}
                    </span>
                  </div>
                  <div className="date-card">
                    <span className="date-label">Início do Campeonato</span>
                    <span className="date-value">{formatDate(selectedChampionship.startDate)}</span>
                  </div>
                  <div className="date-card">
                    <span className="date-label">Término do Campeonato</span>
                    <span className="date-value">{formatDate(selectedChampionship.endDate)}</span>
                  </div>
                </div>
              </section>

              <section className="crud-section">
                <h2 className="section-title">Times Inscritos</h2>
                {enrolledTeams.length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum time inscrito ainda</p>
                  </div>
                ) : (
                  <div className="teams-list">
                    {enrolledTeams.map((enrollment) => (
                      <div key={enrollment.id} className="team-item">
                        <div className="team-item-info">
                          {enrollment.team?.logo ? (
                            <img src={enrollment.team.logo} alt={enrollment.team.name} className="team-logo" />
                          ) : (
                            <div className="team-logo-placeholder">
                              {enrollment.team?.name?.charAt(0).toUpperCase() || "T"}
                            </div>
                          )}
                          <span className="team-name">{enrollment.team?.name || "Time"}</span>
                        </div>
                        <span className={`team-status team-status-${enrollment.status}`}>
                          {enrollment.status === "confirmado"
                            ? "Confirmado"
                            : enrollment.status === "pendente"
                            ? "Pendente"
                            : "Cancelado"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="details-sidebar">
              <section className="crud-section">
                <h2 className="section-title">Informações</h2>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Tipo de Disputa</span>
                    <span className="info-value">
                      {DISPUTE_TYPES.find((t) => t.value === selectedChampionship.disputeType)
                        ?.label || selectedChampionship.disputeType}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Limite de Times</span>
                    <span className="info-value">{selectedChampionship.teamLimit}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Times Inscritos</span>
                    <span className="info-value">
                      {enrolledTeams.length} / {selectedChampionship.teamLimit}
                    </span>
                  </div>
                  {selectedChampionship.location && (
                    <div className="info-item">
                      <span className="info-label">Local</span>
                      <span className="info-value">{selectedChampionship.location}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Criado em</span>
                    <span className="info-value">{formatDate(selectedChampionship.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Atualizado em</span>
                    <span className="info-value">{formatDate(selectedChampionship.updatedAt)}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View: List
  if (championshipsLoading && championships.length === 0) {
    return (
      <div className="championships-crud-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Carregando campeonatos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="championships-crud-container">

      <div className="crud-header">
        <div>
          <h1 className="crud-title">Gerenciar Campeonatos</h1>
          <p className="crud-subtitle">Cadastre, edite e gerencie todos os campeonatos</p>
        </div>
        <button type="button" className="new-btn" onClick={handleNewChampionship}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Novo Campeonato
        </button>
      </div>

      <div className="crud-content">
        {/* Filtros e Busca */}
        <section className="crud-section filters-section">
          <div className="filters-grid">
            <div className="search-group">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
                <path
                  d="m19 19-4.34-4.34M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
                  stroke="#A6A9B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar campeonato..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="filter-category">Categoria:</label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
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

            <div className="filter-group">
              <label htmlFor="filter-status">Status:</label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="filter-select"
              >
                <option value="all">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="finalizado">Finalizado</option>
                <option value="inscricoes_abertas">Inscrições Abertas</option>
                <option value="inscricoes_encerradas">Inscrições Encerradas</option>
                <option value="aguardando_inicio">Aguardando Início</option>
              </select>
            </div>
          </div>
        </section>

        {/* Listagem */}
        <section className="crud-section">
          {paginatedChampionships.length === 0 ? (
            <div className="empty-state">
              <p>
                {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                  ? "Nenhum campeonato encontrado com os filtros aplicados"
                  : "Nenhum campeonato cadastrado ainda"}
              </p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="championships-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Status</th>
                      <th>Início</th>
                      <th>Término</th>
                      <th>Times</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedChampionships.map((championship) => (
                      <tr key={championship.id}>
                        <td>
                          <div className="table-cell-name">
                            {championship.image && (
                              <img
                                src={championship.image}
                                alt={championship.name}
                                className="table-image"
                              />
                            )}
                            <span>{championship.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="category-badge-small">
                            {championship.category?.icon} {championship.category?.name}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(championship.status)}`}>
                            {getStatusLabel(championship.status)}
                          </span>
                        </td>
                        <td>{formatDate(championship.startDate)}</td>
                        <td>{formatDate(championship.endDate)}</td>
                        <td>
                          {championship.enrolledTeams || 0} / {championship.teamLimit}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="action-btn view-btn"
                              onClick={() => handleViewDetails(championship.id)}
                              title="Ver detalhes"
                            >
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7ZM10 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="action-btn edit-btn-small"
                              onClick={() => handleEdit(championship.id)}
                              title="Editar"
                            >
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74169 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4584 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.90833 4.20831C10.2667 6.00831 11.7333 7.46665 13.5333 7.80831"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.5 18.3333H17.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="action-btn delete-btn-small"
                              onClick={() => {
                                setDeleteTargetId(championship.id);
                                setShowDeleteModal(true);
                              }}
                              title="Excluir"
                            >
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.14167 4.56665C7.5 4.56665 5.85833 4.64998 4.21667 4.81665L2.5 4.98332M7.08333 4.14165L7.26667 3.04998C7.4 2.29165 7.5 1.66665 8.90833 1.66665H11.0917C12.5 1.66665 12.6083 2.31665 12.7333 3.05832L12.9167 4.14165M15.2083 7.61665L14.6583 16.0083C14.5417 17.3167 14.4583 18.3333 11.3583 18.3333H8.64167C5.54167 18.3333 5.45833 17.3167 5.34167 16.0083L4.79167 7.61665M8.60833 13.75H11.3833M7.91667 10.4167H12.0833"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <span className="pagination-info">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    type="button"
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}></div>
          <div className="delete-modal">
            <h3 className="modal-title">Confirmar exclusão</h3>
            <p className="modal-message">
              Tem certeza que deseja excluir este campeonato? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteTargetId(null);
                }}
              >
                Cancelar
              </button>
              <button type="button" className="modal-confirm-btn" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

