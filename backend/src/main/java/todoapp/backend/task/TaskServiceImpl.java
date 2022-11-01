package todoapp.backend.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import todoapp.backend.ItemNotFoundException;
import todoapp.backend.toDoList.ToDoList;
import todoapp.backend.toDoList.ToDoListRepository;
import todoapp.backend.toDoListTask.ToDoListTask;
import todoapp.backend.toDoListTask.ToDoListTaskRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ToDoListRepository toDoListRepository;
    private final ToDoListTaskRepository toDoListTaskRepository;
    private static final String NOT_FOUND = "Task not found with id: ";

    @Override
    public Task saveTask(Task task, int listId) {
        ToDoList list = toDoListRepository.findById(listId).orElseThrow(() -> new ItemNotFoundException(NOT_FOUND + listId ));
        Task newTask = taskRepository.save(task);
        ToDoListTask toDoListTask = new ToDoListTask();
        toDoListTask.setList(list);
        toDoListTask.setTask(newTask);
        toDoListTaskRepository.save(toDoListTask);
        log.info("ToDoListTask was created successfully: {}",toDoListTask );
        newTask = taskRepository.save(task);
        log.info("Task was added successfully: {}", newTask);
        return newTask;
    }

    @Override
    public Task getTaskById(int id) throws ItemNotFoundException {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(NOT_FOUND + id ));
    }

    @Override
    public Task updateTaskById(int id, Task task) throws ItemNotFoundException {
        Task oldTask = taskRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(NOT_FOUND + id ));
        oldTask.setName(task.getName());
        oldTask.setStatus(task.isStatus());
        Task updatedTask = taskRepository.save(oldTask);
        log.info("Task was updated as follows: {}", updatedTask);
        return updatedTask;
    }

    @Override
    public void deleteTaskById(int id)throws ItemNotFoundException {
        if (taskRepository.existsById(id)) {
            ToDoListTask toDoListTask = toDoListTaskRepository.findByIdTask(id);
            toDoListTaskRepository.deleteById(toDoListTask.getTodoListTaskId());
            taskRepository.deleteById(id);
            log.info("Task was with id {} was deleted", id);
        }else{
            log.info("Task was with id {} not found", id);
            throw new ItemNotFoundException(NOT_FOUND + id );
        }
    }

}
