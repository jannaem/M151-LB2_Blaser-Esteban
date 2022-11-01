import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { List, ListItem, ListItemAvatar, Button } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import AddListDialog from "../../../components/molecules/Dialogs/AddListDialog";
import { ToDo } from "../../../models/ToDo";
import ToDoList from "../../../components/molecules/ToDoList/ToDoList";
import "./ToDoPage.css";
import Task from "../../../models/Task";
import ToDoListService from "../../../services/ToDoListService";
import TaskList from "../../atoms/TaskList/TaskList";
import AddButton from "../../atoms/AddButton/AddButton";
import AddTaskDialog from "../../../components/molecules/Dialogs/AddTaskDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthenticationContext";
const ToDoPage = () => {
  const navigation = useNavigate();
  const { logout, principal } = useAuth();
  const [toDo, setToDo] = useState<ToDo>();
  const [lists, setLists] = useState<ToDo[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<ToDo>({
    toDoListId: "1234",
    name: "default",
  });
  const [deleteModus, setDeleteModus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [openTaskDialog, setTaskDialog] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteListDialog, setOpenDeleteListDialog] = useState(false);
  const [openUpdateListDialog, setOpenUpdateListDialog] = useState(false);

  const userId = "3";
  const getLists = (userId: string) => {
    ToDoListService.getAllLists(userId).then((res) => {
      setLists(res);
    });
  };
  const getTasks = (listId: string) => {
    ToDoListService.getToDoList(listId).then((res) => {
      setTasks(res.tasks);
    });
  };

  const handleDeleteButton = () => {
    setDeleteModus(!deleteModus);
  };
  const handleDeleteTask = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const handleUpdateTask = () => {
    setOpenUpdateDialog(!openUpdateDialog);
  };
  const handleDeleteList = () => {
    setOpenDeleteListDialog(!openDeleteListDialog);
  };
  const handleUpdateList = () => {
    setOpenUpdateListDialog(!openUpdateListDialog);
  };
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleFormDialog = () => {
    setOpenFormDialog(!openFormDialog);
  };
  const handleTaskDialog = () => {
    setTaskDialog(!openTaskDialog);
  };

  useEffect(() => {
    if (selectedToDo.toDoListId !== "1234") {
      getTasks(selectedToDo.toDoListId.toString());
    }
  }, [selectedToDo, openTaskDialog, openUpdateDialog, openDeleteDialog]);

  useEffect(() => {
    getLists(userId);
    if (
      (lists.length > 0 && selectedToDo.name === "default") ||
      lists.length === 1
    ) {
      setSelectedToDo(lists[0]);
      console.log(selectedToDo);
      getTasks(lists[0].toDoListId);
    }
  }, [userId, openFormDialog, open]);

  useEffect(() => {
    getLists(userId);
  }, [openUpdateListDialog, openDeleteListDialog]);
  useEffect(() => {
    if (lists.length > 0) {
      setSelectedToDo(lists[0]);
    }
  }, [lists]);

  return (
    <Grid container>
      <Grid item md={5} xs={12} direction={"column"}>
        <List>
          <Card id={"logOutCard"}>
            <ListItem disablePadding>
              <ListItem
                disablePadding
                secondaryAction={
                  <Button
                    variant="contained"
                    endIcon={<LogoutIcon />}
                    onClick={() => {
                      logout();
                      navigation("/");
                    }}
                  >
                    logout
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar id={"avatar"}>
                    {principal?.username.charAt(0).toUpperCase() +
                      "" +
                      principal?.username.charAt(1).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <Typography component="h1" variant="h5" className={"text"}>
                  {principal?.username}
                </Typography>
              </ListItem>
            </ListItem>
          </Card>
          <ListItem
            secondaryAction={
              deleteModus === false ? (
                <Button
                  id={"deleteupdateAList"}
                  variant="outlined"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                  onClick={handleDeleteButton}
                >
                  edit mode
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDeleteButton}
                >
                  cancel
                </Button>
              )
            }
          >
            <Typography
              component="h2"
              variant="h5"
              className={"text"}
              id={"chooseAList"}
            >
              To Do Lists
            </Typography>
          </ListItem>
        </List>
        <ToDoList
          toDos={lists}
          deleteModus={deleteModus}
          handleDialog={handleDialog}
          setDeleteToDo={(deleteTD: ToDo) => {
            setToDo(deleteTD);
          }}
          setSelectedToDo={(selectedTD: ToDo) => {
            setSelectedToDo(selectedTD);
          }}
          selectedToDo={selectedToDo}
          handleUpdatedDialog={handleUpdateList}
          openUpdate={openUpdateListDialog}
          handleDeletedDialog={handleDeleteList}
          openDelete={openDeleteListDialog}
        />
        <Button
          id={"addAList"}
          color={"primary"}
          variant={"contained"}
          className={"button"}
          fullWidth
          startIcon={<PlaylistAddIcon />}
          onClick={handleFormDialog}
        >
          Add ToDo list
        </Button>
        <AddListDialog
          open={openFormDialog}
          title={"Add ToDo List"}
          text={"Enter the name of your new list"}
          label={"Name"}
          handleDialog={handleFormDialog}
          userId={userId}
        />
      </Grid>
      <Grid item md={7} xs={12} direction={"column"} id={"toDo"}>
        <Grid container direction="row" id={"taskContainer"}>
          <Grid container></Grid>
          <Grid item md={11}>
            <Typography
              component="h1"
              align={"left"}
              variant="h3"
              className={"text"}
              style={{ margin: "-1.1rem" }}
            >
              {selectedToDo.name}
            </Typography>
          </Grid>{" "}
          <Grid item md={1}>
            {tasks.length > 0 && <HelpIcon color="secondary" />}
          </Grid>
          <Grid item md={3}></Grid>{" "}
          <Grid container>
            <Grid item md={12} xs={12}>
              <TaskList
                tasks={tasks}
                handleUpdatedDialog={handleUpdateTask}
                openUpdate={openUpdateDialog}
                handleDeletedDialog={handleDeleteTask}
                openDelete={openDeleteDialog}
              ></TaskList>
            </Grid>
            {selectedToDo.toDoListId !== "1234" && (
              <AddButton
                id={"addATask"}
                onClick={() => setTaskDialog(!openTaskDialog)}
              ></AddButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <AddTaskDialog
        open={openTaskDialog}
        title={"Add Task to ToDo List"}
        text={"Enter the name of your new Task"}
        label={"Name"}
        handleDialog={handleTaskDialog}
        listId={selectedToDo.toDoListId}
      ></AddTaskDialog>
    </Grid>
  );
};
export default ToDoPage;
