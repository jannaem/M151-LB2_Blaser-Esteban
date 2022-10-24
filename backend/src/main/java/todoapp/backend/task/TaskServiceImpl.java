package todoapp.backend.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import todoapp.backend.ItemNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private static final String NOT_FOUND = "Task not found with id: ";

    @Override
    public Task saveTask(Task task, int listId) {

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


    }

}
