import { IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToDo } from "../../../models/ToDo";
import "./ToDoList.css";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

interface toDoListProps {
  toDos: ToDo[];
  deleteModus: boolean;
  handleDialog: () => void;
  setDeleteToDo: (id: ToDo) => void;
  setSelectedToDo: (id: ToDo) => void;
  selectedToDo: ToDo;
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
}

const ToDoList = ({
  toDos,
  deleteModus,
  setSelectedToDo,
  selectedToDo,
  openUpdate,
  handleDeletedDialog,
  openDelete,
  handleUpdatedDialog,
}: toDoListProps) => {
  const [selectedList, setSelectedList] = useState<ToDo>({
    toDoListId: "",
    name: "",
  });
  return (
    <>
      <List id={"list"}>
        {toDos.map((toDo: ToDo) => (
          <ListItem
            disablePadding
            key={toDo.toDoListId}
            secondaryAction={
              <>
                {deleteModus === true ? (
                  <>
                    <IconButton
                      style={{ color: "#408793" }}
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setSelectedList(toDo);
                        handleUpdatedDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      style={{ color: "#408793" }}
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setSelectedList(toDo);
                        handleDeletedDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : null}
              </>
            }
            className={selectedToDo.toDoListId === toDo.toDoListId ? "selectedToDo" : "toDo"}
          >
            <ListItemButton onClick={() => setSelectedToDo(toDo)}>
              <ListItemText primary={toDo.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default ToDoList;
