import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Input,
  Button,
} from "@mui/material";
import TodoCard from "../components/TodoCard";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { authContext } from "../components/Auth";
import add from "./../functions/add";
import { getAllLists } from "../functions/get";

export default function DisplayListPage() {
  const [lists, setLists] = useState([]);
  const [openInput, setOpenInput] = useState(false);
  const [newList, setNewList] = useState("");
  const user = useContext(authContext);

  useEffect(() => {
    getAllLists("todo", user.uid).then((data) => {
      setLists(data);
    });
  }, []);

  function handleOpenInput() {
    setOpenInput(!openInput);
  }

  function handleInputChange(e) {
    setNewList(e.target.value);
  }

  function createNewTodolist(e) {
    const newTodo = {
      title: newList,
      users: [user.uid],
    };
    add(newTodo, "todo").then((data) => {
      const updateList = { ...newTodo, id: data };
      setLists([...lists, updateList]);
    });
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", marginTop: "20px" }}
    >
      {lists.map((list) => (
        <Grid item key={list.id}>
          <TodoCard list={list} />
        </Grid>
      ))}
      <Grid item>
        <Card
          sx={{
            xs: { width: "100px" },
            width: "201px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              onClick={handleOpenInput}
              sx={{ textAlign: "center" }}
            >
              Créer une nouvelle liste
            </Typography>
          </CardContent>
          {openInput ? (
            <CardActions>
              <AddIcon onClick={handleOpenInput} />
            </CardActions>
          ) : (
            <CardActions sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                onChange={handleInputChange}
                value={newList}
                sx={{ my: "10px" }}
              />
              <Button
                variant="contained"
                onClick={createNewTodolist}
                sx={{ my: "10px" }}
              >
                Créer
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
