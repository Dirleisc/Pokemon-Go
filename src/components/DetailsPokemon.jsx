/* eslint-disable react/prop-types */
import "./Details.css";

// eslint-disable-next-line react/prop-types
const DetailsPokemon = ({ show, pokemon, cerrar }) => {
  return (
    <div
      className="modal-container"
      onClick={cerrar}
      style={{ display: show ? "grid" : "none" }}
    >
      <section className="modal-body">
        <div className="image-container">
          <img
            src={pokemon.imagem}
            alt={pokemon.nome}
            className="image-detail"
          />
          <section>
            {pokemon.types?.map((type) => (
              <span className="tag" key={type.id}>
                {type}
              </span>
            ))}
          </section>
        </div>
        <div className="data">
          <h2 className="titulo">
            {pokemon.nome}({pokemon.id})
          </h2>
          <h3 className="titulo-seccion">Ability</h3>
          {pokemon.abilities?.map((ability) => (
            <span className="tag" key={ability}>
              {ability}
            </span>
          ))}
          <h3 className="titulo-seccion">Statistics</h3>
          <div className="stats">
            {pokemon.stats?.map((stat) => (
              // eslint-disable-next-line react/jsx-key
              <section>
                <span className="puntos">{stat.base}</span>
                <span>{stat.name}</span>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsPokemon;
