import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Tournament } from '../../types';

interface ChampionshipFormProps {
  championship?: Tournament;
  onSave: (championship: Tournament) => void;
  onCancel: () => void;
}

export const ChampionshipForm = ({ championship, onSave, onCancel }: ChampionshipFormProps) => {
  const [formData, setFormData] = useState<Omit<Tournament, 'id'>>({
    name: '',
    logo: '',
    category: 'Futebol',
    color: '#3B82F6',
    startDate: '',
    endDate: '',
    isRegistered: false,
  });

  useEffect(() => {
    if (championship) {
      setFormData({
        name: championship.name,
        logo: championship.logo,
        category: championship.category,
        color: championship.color,
        startDate: championship.startDate,
        endDate: championship.endDate,
        isRegistered: championship.isRegistered || false,
      });
    }
  }, [championship]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = championship?.id || `champ-${Date.now()}`;
    onSave({ ...formData, id });
  };

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const categories = ['Futebol', 'Basquete', 'Vôlei', 'Handebol', 'E-sports', 'Tênis', 'Cricket', 'Outros'];
  const colors = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Vermelho', value: '#DC2626' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Amarelo', value: '#F59E0B' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Azul Escuro', value: '#1E3A8A' },
    { name: 'Cinza', value: '#6B7280' },
  ];

  return (
    <div className="championship-form-overlay">
      <div className="championship-form-modal">
        <div className="championship-form-header">
          <h2 className="championship-form-title">
            {championship ? 'Editar Campeonato' : 'Novo Campeonato'}
          </h2>
          <button className="championship-form-close" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="championship-form">
          <div className="form-group">
            <label htmlFor="name">Nome do Campeonato</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Ex: LaLiga 2023"
            />
          </div>

          <div className="form-group">
            <label htmlFor="logo">Logo (Texto ou inicial)</label>
            <input
              id="logo"
              type="text"
              value={formData.logo}
              onChange={(e) => handleChange('logo', e.target.value)}
              required
              placeholder="Ex: LL"
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="color">Cor</label>
            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`color-option ${formData.color === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleChange('color', color.value)}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="color-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Data de Início</label>
              <input
                id="startDate"
                type="text"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
                placeholder="Ex: 16 Jun"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Data de Término</label>
              <input
                id="endDate"
                type="text"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
                placeholder="Ex: 31 Jul"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isRegistered}
                onChange={(e) => handleChange('isRegistered', e.target.checked)}
              />
              <span>Já inscrito</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {championship ? 'Salvar Alterações' : 'Criar Campeonato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

