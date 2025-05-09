import React,{useRef} from 'react'

export default function TodoSearch({onSearch}) {
  const searchName = useRef();
  const searchAge = useRef();
  const searchPlace = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = {
      name: searchName.current.value,
      age: searchAge.current.value,
      place: searchPlace.current.value,
    };
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="bogo-container">
      <div className="form-group">
        <label>Name</label>
        <input type="text" ref={searchName} />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input type="number" ref={searchAge} />
      </div>
      <div className="form-group">
        <label>Place</label>
        <input type="text" ref={searchPlace} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

