import React, {useState, useEffect} from 'react';

import './styles.css';

function DevForm({ onSubmit }){
    const [github_username, setGithubUsername] = useState ('');
    const [conhecimentos, setConhecimentos] = useState ('');
    const [latitude, setLatitude] = useState ('');
    const [longitude, setLongitude] = useState ('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
    
          }, 
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        )
      }, []);

      async function handleSubmit(e){
        e.preventDefault();
         
        await onSubmit({
            github_username,
            conhecimentos,
            latitude,
            longitude,
        });

        setGithubUsername('');
        setConhecimentos('');
        
      }

    return(
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="conhecimentos">Tecnologias</label>
            <input name="conhecimentos" id="conhecimentos" required value={conhecimentos} onChange={e => setConhecimentos(e.target.value)} />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>

            
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>
          
          </div>

          <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;