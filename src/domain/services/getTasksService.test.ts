import { ITaskRepository } from "../interfaces/ITaskRepository";
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
          }];
        mockTaskRepository.getTasks.mockResolvedValue(expectedTasks);

        // Act
        const tasks = await getTasksService.execute();

        // Assert
        expect(tasks).toEqual(expectedTasks);
    });
});
