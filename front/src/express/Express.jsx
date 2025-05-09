import React, { useEffect, useRef, useState } from "react";
import "../mainpage.css"; // create this file for styling
import { BsSearchHeart } from "react-icons/bs";
import { RiUserHeartFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import TodoAdd from "./TodoAdd";
import TodoSearch from "./TodoSearch";
import axios from "axios";

export default function Express() {
  const [activeComponent, setActiveComponent] = useState("add"); // default is 'a

  const [allData, setAllData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const addName = useRef();
  const addPlace = useRef();
  const addAge = useRef();
  const editId = useRef(null);

  ///post put functions

  const addData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userDetails = Object.fromEntries(formData.entries());
    

    if (isEditing) {
      // await fetch(`http://localhost:4000/employee/update/${editId.current}`, {
      //   method: "PUT",
      //   body:reqObj,
      // })
      await axios.put(`http://localhost:4000/employee/update/${editId.current}`,userDetails)

        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } 
    else 
    {
      // await fetch("http://localhost:4000/employee/add", {
      //   method: "POST",
      //   reqObj,

      // })
      await axios.post("http://localhost:4000/employee/add",userDetails)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  //fetch data

  const fetchData = () => {
    fetch("http://localhost:4000/employee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAllData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //useEffect

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit button click
  const handleEdit = (item) => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this entry?"
    );
    if (confirmEdit) {
      editId.current = item._id;
      addAge.current.value = item.age;
      addName.current.value = item.name;
      addPlace.current.value = item.place;
      setIsEditing(true);
    }
  };
  //delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:4000/employee/delete/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Not deleted");
        }
        return response.json();
      });
    }
    fetchData()
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  ///search
  const handleSearch = (query) => {
    const params = new URLSearchParams();

    if (query.name) params.append("name", query.name);
    if (query.age) params.append("age", query.age);
    if (query.place) params.append("place", query.place);

    fetch(`http://localhost:4000/employee?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setAllData(data.data))
      .catch((error) => console.error("Error:", error));
  };

  
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Express js Application</h1>
      <div style={{ display: "flex",justifyContent:"space-around"}}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <h4>Add New</h4> */}
            {activeComponent === "add" ? <h2>Add New</h2> : <h2>Search</h2>}
            {activeComponent === "add" ? (
              <button style={{
                fontSize:"30px",border:"none",background:"none",display:"flex",alignItems:"center"
              }} onClick={() => setActiveComponent("search")}>
                <BsSearchHeart />

              </button>
            ) : (
              <button style={{
                fontSize:"30px",border:"none",background:"none",display:"flex",alignItems:"center"
              }} onClick={() => setActiveComponent("add")}><RiUserHeartFill />

</button>
            )}
          </div>

          {activeComponent === "add" ? (
            <TodoAdd
              isEditing={isEditing}
              addData={addData}
              addAge={addAge}
              addName={addName}
              addPlace={addPlace}
            />
          ) : (
            <TodoSearch onSearch={handleSearch} />
          )}
        </div>
        {/* Display submitted data in a table */}
        <div>
          <div className="data-table"  style={{overflowX:"auto",height:"350px"}}>
            <table style={{ width: "100vh" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Place</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.place}</td>
                    <td>
                      <button style={{
                fontSize:"30px",border:"none",background:"none",
              }} onClick={() => handleEdit(item)}><TbUserEdit />
</button>
                    </td>
                    <td>
                      <button style={{
                fontSize:"30px",border:"none",background:"none",
              }}
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDeleteForever />

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
