import dotenv from 'dotenv';

export const setup = () => {
    dotenv.config({ path: './.env.test.local' });
}