import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []); 

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleCreateMatch = async () => {
    const hasOngoingMatch = matches.some(match => match.status === 'ongoing');

    if (hasOngoingMatch) {
      alert('Vous avez déjà une partie en cours. Attendez qu\'elle se termine.');
      return;
    }

    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create match');
      }

      const updatedMatch = await response.json();
      setMatches([updatedMatch]);
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  const handleJoinMatch = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ width: '30%', border: '2px solid black', padding: '10px', marginLeft: '10px' }}>
          <h3>Règle du Jeu :</h3>
          <p>
            Le jeu oppose deux personnes qui choisissent chacune l'une des trois options : pierre, papier ou ciseaux.
            Les résultats possibles sont les suivants :
            - Pierre bat les ciseaux (La pierre casse les ciseaux)
            - Ciseaux battent le papier (Les ciseaux coupent le papier).
            - Papier bat la pierre (Le papier recouvre la pierre).
            À vous d'être stratégique pour gagner la partie !
          </p>
        </div>

        <div style={{ width: '30%', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleCreateMatch}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Créer une partie
          </button>
        </div>

        <div style={{ width: '30%', border: '2px solid black', padding: '10px', marginRight: '10px' }}>
          <h3>Historique des parties jouées :</h3>
          <ul>
            {matches.map((match, index) => (
              <li
                key={match._id}
                onClick={() => handleJoinMatch(match._id)}
                style={{
                  color: match.status === 'won' ? 'green' : match.status === 'lost' ? 'red' : 'orange',
                }}
              >
                Partie {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
