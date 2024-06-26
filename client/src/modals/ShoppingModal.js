import React, { useState, useEffect } from "react";
import styles from "../style/ShoppingModal.module.css";
import axios from "axios";

export default function WorkOutModal({
  closeModal,
  position,
  modal,
  setOpenModal,
  shopping,
  setShopping,
  shoppingId,
  setItems,
  items,
}) {
  const [itemName, setItemName] = useState();
  const [listName, setListName] = useState();

  function addShopping() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/shopping/new",
        {
          name: listName,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setShopping([...shopping, response.data]);
        }
      });
  }

  function addItem() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/items/new",
        {
          name: itemName,
          ShoppingId: shoppingId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setItems([...items, response.data]);
        }
      });
  }

  function editList() {
    axios.put(
      process.env.REACT_APP_BACKEND_BASE_URL + "/shopping/edit",
      {
        newName: listName,
        shoppingId: shoppingId,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    const newShopping = shopping.map((e) => {
      if (e.id === shoppingId) {
        return { ...e, name: listName };
      } else {
        return e;
      }
    });

    setShopping(newShopping);
  }

  if (modal === "addList") {
    return (
      <div
        className={styles.modalContainer}
        style={{ top: "40%", left: "34,5%" }}
      >
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>New List</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.data}>Name: </label>
            <br />
            <input
              name="list"
              type="text"
              className={styles.data2}
              onChange={(event) => setListName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                addShopping();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  } else if (modal === "addItem") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>New Item</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.data}>Name: </label>
            <br />
            <input
              name="list"
              type="text"
              className={styles.data2}
              onChange={(event) => {
                setItemName(event.target.value);
              }}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                addItem();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  } else if (modal === "editList") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit List</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.data}>Name: </label>
            <input
              name="list"
              type="text"
              className={styles.data2}
              onChange={(event) => {
                setItemName(event.target.value);
              }}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editList();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
