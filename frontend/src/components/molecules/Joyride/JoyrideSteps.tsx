import JoyrideContent from "./JoyrideContent";
import { Step } from "react-joyride";

export const joyrideStepsForList: Step[] = [
    {
      target: "#addAList",
      content: (
        <JoyrideContent
          title={"Add a List"}
          body={"By clicking this button you can add a new ToDo list."}
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#deleteupdateAList",
      content: (
        <JoyrideContent
          title={"Delete or Edit ToDo List"}
          body={
            "By clicking on the edit mode you enable the buttons responsible for editing and deleting each list.\n To edit simply click the edit button and enter the new name of the list.\n Delete lists by clicking on the trash can and confirming your action!"
          }
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#addATask",
      content: (
        <JoyrideContent
          title={"Add a Task"}
          body={"By clicking this button you can add a new ToDo task."}
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
  ];

export  const joyrideStepsForTask: Step[] = [
    {
      target: "#deleteATask",
      content: (
        <JoyrideContent
          title={"Delete a Task"}
          body={"To delete the task simply click on the trash can icon."}
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#renameATask",
      content: (
        <JoyrideContent
          title={"Rename a Task"}
          body={
            "If you would like to rename a task you can click on the edit button and enter the new name of the task"
          }
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#updateState",
      content: (
        <JoyrideContent
          title={"Update the state of a Task"}
          body={'To set a task to either "done" or "to do " click here.'}
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
  ];