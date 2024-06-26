import React, { useEffect, useState } from "react";
import styles from "../style/Shopping.module.css";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Fab from "@mui/material/Fab";
import ShoppingModal from "../modals/ShoppingModal";
import CircleIcon from "@mui/icons-material/Circle";

export default function Shopping() {
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [shopping, setShopping] = useState([]);
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [shoppingId, setShoppingId] = useState([0]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/shopping", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setShopping(response.data.listOfShopping);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/items", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setItems(response.data.listOfItems);
      });
  }, []);

  let position = "0%";

  function deleteList(id) {
    axios.delete(process.env.REACT_APP_BACKEND_BASE_URL + `/shopping/delete/${id}`,
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });

    setShopping(shopping.filter((e) => e.id !== id));
  }

  function deleteItem(id) {
    axios.delete(process.env.REACT_APP_BACKEND_BASE_URL + `/items/delete/${id}`,
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });

    setItems(items.filter((e) => e.id !== id));
  }

  return (
    <div>
      <h1 className={styles.h1}>Shopping</h1>
      {shopping.map((shopping) => {
        return (
          <div className={styles.list}>
            <div className={styles.listHeader}>
              <div className={styles.listName}>{shopping.name}</div>
              <div className={styles.listActions}>
                <div
                  onClick={() => setEdit(!edit)}
                  style={{ display: "inline" }}
                >
                  {edit ? (
                    <DoneIcon />
                  ) : (
                    <EditIcon
                      onClick={() => {
                        setOpenModal(true);
                        setModal("editItem");
                        setShoppingId(shopping.id);
                      }}
                    />
                  )}
                </div>
                {edit && (
                  <div style={{ display: "inline" }}>
                    <ClearIcon
                      onClick={() => {
                        deleteList(shopping.id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.listItems}>
              {items.map((item) => {
                if (item.ShoppingId === shopping.id)
                  return (
                    <div style={{ padding: "10px", borderRadius: "10px" }}>
                      <div
                        style={{ display: "inline" }}
                        onDoubleClick={() => setDone(!done)}
                      >
                        <CircleIcon
                          sx={{
                            width: "10px",
                            height: "10px",
                            marginRight: "5px",
                          }}
                        />
                        {item.name}
                      </div>
                      <div style={{ float: "right", display: "inline" }}>
                        {edit && (
                          <ClearIcon
                            fontSize="small"
                            onClick={() => {
                              deleteItem(item.id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
              })}
            </div>
            <div className={styles.addItemButton}>
              <Fab
                size="small"
                sx={{ bgcolor: "lime", zIndex: 0 }}
                style={{ backgroundColor: "coral" }}
                aria-label="add"
                onClick={() => {
                  setOpenModal(true);
                  setModal("addItem");
                  setShoppingId(shopping.id);
                }}
                className={styles.fab}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        );
      })}
      <div className={styles.addListButton}>
        <Fab
          size="medium"
          sx={{ bgcolor: "lime", zIndex: 0 }}
          style={{ backgroundColor: "coral" }}
          aria-label="add"
          onClick={() => {
            setOpenModal(true);
            setModal("addList");
          }}
          className={styles.fab}
        >
          <AddIcon />
        </Fab>
      </div>
      {openModal && (
        <ShoppingModal
          closeModal={setOpenModal}
          position={position}
          modal={modal}
          setOpenModal={setOpenModal}
          shopping={shopping}
          setShopping={setShopping}
          shoppingId={shoppingId}
          setItems={setItems}
          items={items}
        />
      )}
    </div>
  );
}
