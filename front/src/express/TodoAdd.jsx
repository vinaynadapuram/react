import React from 'react'

export default function TodoAdd(props) {
  const {isEditing,addAge,addData,addName,addPlace} =props
  return (
  <div>
      <form className="bogo-container" onSubmit={addData}>
        <div className="form-group">
          <label>Name</label>
          <input
          ref={addName}
            type="text"
            required
            name="name"
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
          ref={addAge}
            type="number"
            required
            name="age"
          />
        </div>

        <div className="form-group">
          <label>Place</label>
          <input
          ref={addPlace}
            type="text"
            required
            name="place"
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
       </form>
   </div>
)
}

