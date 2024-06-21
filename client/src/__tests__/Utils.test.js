import { validateToken } from "../src/Utils";
describe('validateToken', () => {
    beforeEach(() => {
        // Clear all instances and calls to localStorage
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should return null if there is no token in localStorage', () => {
        localStorage.getItem = jest.fn(() => null);

        const result = validateToken();

        expect(result).toBeNull();
    });

    it('should return null if the token is expired', () => {
        const expiredToken = JSON.stringify({
            token: 'expiredToken',
            expiration_time: new Date().getTime() - 1000, // 1 second ago
        });
        localStorage.getItem = jest.fn(() => expiredToken);

        const result = validateToken();

        expect(result).toBeNull();
    });

    it('should return the token if it is valid', () => {
        const validToken = JSON.stringify({
            token: 'validToken',
            expiration_time: new Date().getTime() + 1000, // 1 second in the future
        });
        localStorage.getItem = jest.fn(() => validToken);

        const result = validateToken();

        expect(result).toBe('validToken');
    });
});
