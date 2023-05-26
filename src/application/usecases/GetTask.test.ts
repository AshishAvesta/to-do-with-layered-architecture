import { Task } from '../../domain/entities/Task';
import { IGetTasks } from '../../domain/interfaces/IGetTasks';
import { GetTasksUseCase } from './GetTasksUseCase';


describe('GetTasksUseCase', () => {
  it('calls execute on the IGetTasks implementation and returns the result', async () => {
    const mockTasks = [new Task('Test task', 'date', 'high','1')];
    const getTasks: IGetTasks = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const getTasksUseCase = new GetTasksUseCase(getTasks);

    const result = await getTasksUseCase.execute();

    expect(getTasks.execute).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });
});
