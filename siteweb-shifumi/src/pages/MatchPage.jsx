import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import pierreImage from '../assets/pierre.png';
import feuilleImage from '../assets/feuille.png';
import ciseauxImage from '../assets/ciseaux.png';

const MatchPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [move, setMove] = useState(null);

  useEffect(() => {
    fetchMatchDetails();
  }, []);

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match details');
      }

      const data = await response.json();
      setMatch(data);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const handleMove = async (selectedMove) => {
    try {
      const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}/turns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ move: selectedMove }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit move');
      }

      setMove(selectedMove);
      fetchMatchDetails();
    } catch (error) {
      console.error('Error submitting move:', error);
    }
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Partie {match._id}</h2>

      {match.user2 ? (
        <div>
          <h3>Choisis bien ton coup</h3>
          <button onClick={() => handleMove('rock')}>
            <img src={pierreImage} alt="Pierre" />
          </button>
          <button onClick={() => handleMove('paper')}>
            <img src={feuilleImage} alt="Feuille" />
          </button>
          <button onClick={() => handleMove('scissors')}>
            <img src={ciseauxImage} alt="Ciseaux" />
          </button>
        </div>
      ) : (
        <p>En attente de l'adversaire...</p>
      )}
    </div>
  );
};

export default MatchPage;
