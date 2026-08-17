import { defineEventHandler } from 'h3';
import { headerMock } from '../../mocks/header';
export default defineEventHandler(() => headerMock);
