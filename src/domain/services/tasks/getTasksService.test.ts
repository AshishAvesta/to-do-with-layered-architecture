import { ITaskRepository } from "../../interfaces/ITaskRepository";
import { GetTasksService } from "./GetTasksService";

describe('GetTasksService', () => {
    let getTasksService: GetTasksService;
    let mockTaskRepository: jest.Mocked<ITaskRepository>;

    beforeEach(() => {
        mockTaskRepository = {
            save: jest.fn(),
            getById: jest.fn(),
            getTasks: jest.fn()
        };
        getTasksService = new GetTasksService(mockTaskRepository);
    });

    test('should return all tasks when execute is called', async () => {
        // Arrange
        const expectedTasks = [{
            description: 'Study for the exam',
            dueDate: '2023-06-30',
            priority: 'high',
            user_id:1
          }];
        mockTaskRepository.getTasks.mockResolvedValue(expectedTasks);

        // Act
        const tasks = await getTasksService.execute();

        // Assert
        expect(tasks).toEqual(expectedTasks);
    });

    it('should return a list of tasks for applying filter', async () => {
        const tasks = [{
            description: 'Study for the exam',
            dueDate: '2023-06-30',
            priority: 'high',
            user_id:1
          }];
          mockTaskRepository.getTasks.mockResolvedValue(tasks);
      
        const result = await getTasksService.execute(10, 0, 'user1');
        expect(result).toEqual(tasks);
        expect(mockTaskRepository.getTasks).toHaveBeenCalledWith(10, 0, 'user1');
      });

      it('should return a list of tasks with provided limit, offset and userId', async () => {
        const tasks = [{   
          id:'1',
          description: 'Study for the exam',
          dueDate: '2023-06-30',
          priority: 'high',
          user_id:1
        },
        {   
          id:'2',
          description: 'watch news on tv',
          dueDate: '2023-06-30',
          priority: 'low',
          user_id:1
        }];
        mockTaskRepository.getTasks.mockResolvedValue(tasks);
      
        const result = await getTasksService.execute(10, 5, 'user1');
        expect(result).toEqual(tasks);
        expect(mockTaskRepository.getTasks).toHaveBeenCalledWith(10, 5, 'user1');
      });
      
      it('should return a list of tasks with provided limit and offset only', async () => {
        const tasks = [{   
          id:'1',
          description: 'Study for the exam',
          dueDate: '2023-06-30',
          priority: 'high',
          user_id:1
        },
        {   
          id:'2',
          description: 'watch news on tv',
          dueDate: '2023-06-30',
          priority: 'low',
          user_id:1
        }];
        mockTaskRepository.getTasks.mockResolvedValue(tasks);
      
        const result = await getTasksService.execute(10, 5);
        expect(result).toEqual(tasks);
        expect(mockTaskRepository.getTasks).toHaveBeenCalledWith(10, 5,undefined);
      });
      
      it('should return a list of tasks with provided userId only', async () => {
        const tasks = [{   
          id:'1',
          description: 'Study for the exam',
          dueDate: '2023-06-30',
          priority: 'high',
          user_id:1
        },
        {   
          id:'2',
          description: 'watch news on tv',
          dueDate: '2023-06-30',
          priority: 'low',
          user_id:1
        }];
        mockTaskRepository.getTasks.mockResolvedValue(tasks);
      
        const result = await getTasksService.execute(undefined, undefined, 'user1');
        expect(result).toEqual(tasks);
        expect(mockTaskRepository.getTasks).toHaveBeenCalledWith(undefined, undefined, 'user1');
      });
});
