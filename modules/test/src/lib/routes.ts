import { FormComponent } from 'form';
import { DummyDataPage } from './DummyDataPage';

export const testRoutes = [
  {
    path: '/test-form',
    name: 'Test Form',
    element: FormComponent,
  },
  {
    path: '/test-data',
    name: 'Test Data Provider',
    element: DummyDataPage,
  }
];
