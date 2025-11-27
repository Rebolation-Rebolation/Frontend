import { useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useChampionships } from '../../context/ChampionshipsContext';
import { ChampionshipForm } from '../championship-form/ChampionshipForm';
import type { Tournament } from '../../types';

export const ChampionshipList = () => {
  const { championships, addChampionship, updateChampionship, deleteChampionship, getChampionshipById } = useChampionships();
  const [editingChampionship, setEditingChampionship] = useState<Tournament | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (id: string) => {
    const championship = getChampionshipById(id);
    if (championship) {
      setEditingChampionship(championship);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este campeonato?')) {
      deleteChampionship(id);
    }
  };

  const handleNew = () => {
    setEditingChampionship(undefined);
    setIsFormOpen(true);
  };

  const handleSave = (championship: Tournament) => {
    if (editingChampionship) {
      updateChampionship(championship.id, championship);
    } else {
      addChampionship(championship);
    }
    setIsFormOpen(false);
    setEditingChampionship(undefined);
  };

  const filteredChampionships = championships.filter((champ) =>
    champ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    champ.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="championship-list-container">
      <div className="championship-list-header">
        <div className="championship-list-title-section">
          <h1 className="championship-list-title">Gerenciar Campeonatos</h1>
          <p className="championship-list-subtitle">
            Total: {championships.length} campeonato{championships.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn-add" onClick={handleNew}>
          <Plus size={20} />
          Novo Campeonato
        </button>
      </div>

      <div className="championship-list-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar por nome ou categoria..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="championship-list-grid">
        {filteredChampionships.length === 0 ? (
          <div className="championship-list-empty">
            <p>Nenhum campeonato encontrado.</p>
            {championships.length === 0 && (
              <button className="btn-primary" onClick={handleNew}>
                Criar Primeiro Campeonato
              </button>
            )}
          </div>
        ) : (
          filteredChampionships.map((championship) => (
            <div key={championship.id} className="championship-list-card">
              <div
                className="championship-card-header"
                style={{ backgroundColor: championship.color }}
              >
                <div className="championship-card-logo">
                  {championship.logo.charAt(0).toUpperCase()}
                </div>
                <div className="championship-card-badge">
                  {championship.isRegistered ? 'Inscrito' : 'Aberto'}
                </div>
              </div>
              <div className="championship-card-body">
                <h3 className="championship-card-name">{championship.name}</h3>
                <div className="championship-card-info">
                  <span className="championship-card-category">{championship.category}</span>
                  <span className="championship-card-dates">
                    {championship.startDate} - {championship.endDate}
                  </span>
                </div>
              </div>
              <div className="championship-card-actions">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => handleEdit(championship.id)}
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(championship.id)}
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <ChampionshipForm
          championship={editingChampionship}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingChampionship(undefined);
          }}
        />
      )}
    </div>
  );
};

