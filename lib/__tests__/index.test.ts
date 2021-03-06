import { mockProcessExit, mockProcessStdout, mockProcessStderr, mockConsoleLog } from '../index';

describe('Mock Process Exit', () => {
    let mockExit: jest.SpyInstance<(_: number) => never>;

    beforeEach(() => {
        mockExit = mockProcessExit();
    });

    it('should exit with a zero code', () => {
        process.exit(0);
        expect(mockExit).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should exit with a non-zero code', () => {
        process.exit(-2);
        expect(mockExit).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(-2);
    });

    it('should be clearable', () => {
        expect(mockExit).toHaveBeenCalledTimes(0);
        process.exit(0);
        expect(mockExit).toHaveBeenCalledTimes(1);
        process.exit(0);
        expect(mockExit).toHaveBeenCalledTimes(2);
        mockExit.mockClear();
        expect(mockExit).toHaveBeenCalledTimes(0);
    });

    afterAll(() => {
        mockExit.mockRestore();
    });
});

describe('Mock Process Stdout', () => {
    let mockStdout: jest.SpyInstance<(buffer: Buffer | string, encoding?: string, cb?: Function) => boolean>;

    beforeEach(() => {
        mockStdout = mockProcessStdout();
    });

    it('should receive a string', () => {
        process.stdout.write('Hello, world!');
        expect(mockStdout).toHaveBeenCalledTimes(1);
        expect(mockStdout).toHaveBeenCalledWith('Hello, world!');
        expect(mockStdout).toReturnWith(true);
    });

    it('should receive a buffer', () => {
        const buf = Buffer.from('Hello, world');
        process.stdout.write(buf);
        expect(mockStdout).toHaveBeenCalledTimes(1);
        expect(mockStdout).toHaveBeenCalledWith(buf);
        expect(mockStdout).toReturnWith(true);
    });

    it('should receive an encoding', () => {
        process.stdout.write('Hello, world!', 'utf-8');
        expect(mockStdout).toHaveBeenCalledTimes(1);
        expect(mockStdout).toHaveBeenCalledWith('Hello, world!', 'utf-8');
        expect(mockStdout).toReturnWith(true);
    });

    it('should receive a callback', () => {
        const cb = jest.fn();
        process.stdout.write('', cb);
        expect(mockStdout).toHaveBeenCalledTimes(1);
        expect(mockStdout).toHaveBeenCalledWith(expect.anything(), cb);
        expect(mockStdout).toReturnWith(true);
    });

    it('should be clearable', () => {
        expect(mockStdout).toHaveBeenCalledTimes(0);
        process.stdout.write('');
        expect(mockStdout).toHaveBeenCalledTimes(1);
        process.stdout.write('');
        expect(mockStdout).toHaveBeenCalledTimes(2);
        mockStdout.mockClear();
        expect(mockStdout).toHaveBeenCalledTimes(0);
    });

    afterAll(() => {
        mockStdout.mockRestore();
    });
});

describe('Mock Process Stderr', () => {
    let mockStderr: jest.SpyInstance<(buffer: Buffer | string, encoding?: string, cb?: Function) => boolean>;

    beforeEach(() => {
        mockStderr = mockProcessStderr();
    });

    it('should receive a string', () => {
        process.stderr.write('Hello, world!');
        expect(mockStderr).toHaveBeenCalledTimes(1);
        expect(mockStderr).toHaveBeenCalledWith('Hello, world!');
        expect(mockStderr).toReturnWith(true);
    });

    it('should receive a buffer', () => {
        const buf = Buffer.from('Hello, world');
        process.stderr.write(buf);
        expect(mockStderr).toHaveBeenCalledTimes(1);
        expect(mockStderr).toHaveBeenCalledWith(buf);
        expect(mockStderr).toReturnWith(true);
    });

    it('should receive an encoding', () => {
        process.stderr.write('Hello, world!', 'utf-8');
        expect(mockStderr).toHaveBeenCalledTimes(1);
        expect(mockStderr).toHaveBeenCalledWith('Hello, world!', 'utf-8');
        expect(mockStderr).toReturnWith(true);
    });

    it('should receive a callback', () => {
        const cb = jest.fn();
        process.stderr.write('', cb);
        expect(mockStderr).toHaveBeenCalledTimes(1);
        expect(mockStderr).toHaveBeenCalledWith(expect.anything(), cb);
        expect(mockStderr).toReturnWith(true);
    });

    it('should be clearable', () => {
        expect(mockStderr).toHaveBeenCalledTimes(0);
        process.stderr.write('');
        expect(mockStderr).toHaveBeenCalledTimes(1);
        process.stderr.write('');
        expect(mockStderr).toHaveBeenCalledTimes(2);
        mockStderr.mockClear();
        expect(mockStderr).toHaveBeenCalledTimes(0);
    });

    afterAll(() => {
        mockStderr.mockRestore();
    });
});

describe('Mock Console Log', () => {
    let mockLog: jest.SpyInstance<(message?: any, ...optionalParams: any[]) => void>;

    beforeEach(() => {
        mockLog = mockConsoleLog();
    });

    it('should receive a string', () => {
        console.log('Hello, world!');
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockLog).toHaveBeenCalledWith('Hello, world!');
    });

    it('should receive an object', () => {
        const obj = {'array': [], 'null': null};
        console.log(obj);
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockLog).toHaveBeenCalledWith(obj);
    });

    it('should be clearable', () => {
        expect(mockLog).toHaveBeenCalledTimes(0);
        console.log('');
        expect(mockLog).toHaveBeenCalledTimes(1);
        console.log('');
        expect(mockLog).toHaveBeenCalledTimes(2);
        mockLog.mockClear();
        expect(mockLog).toHaveBeenCalledTimes(0);
    });

    afterAll(() => {
        mockLog.mockRestore();
    });
});
