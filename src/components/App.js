import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (newType) => {
    setFilters({ type: newType });
  };

  const onFindPetsClick = () => {
    const url = filters.type === "all" ? "http://localhost:3001/pets" : `http://localhost:3001/pets?type=${filters.type}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPets(data);
      });
  };

  const onAdoptPet = (petId) => {
    const updatedPets = pets.map((pet) =>
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;