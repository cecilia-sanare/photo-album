import { Provider } from 'react-redux';
import { App } from '../App';
import { store } from '../../store/store';
import { render } from '@testing-library/react';

describe('<App />', () => {
  it('should render the App', () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component.baseElement).toMatchSnapshot();
  });
});
