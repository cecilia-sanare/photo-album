import { fireEvent, render } from '@testing-library/react';
import { Header } from '../Header';
import { Provider } from 'react-redux';
import { Chance } from 'chance';
import userEvent from '@testing-library/user-event';
import { SelectItem } from '../common/Select';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../../store/slices';

jest.mock('axios');
const axiosMocked = jest.mocked(axios);

const chance = new Chance();

describe('<Header />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: reducers
    });

    jest.spyOn(store, 'dispatch').mockImplementation(() => {});
  });

  it('should render the Header', () => {
    const component = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(component.baseElement).toMatchSnapshot();
  });

  it('should request the albums', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('when a search query is entered', () => {
    it('should update the search query in state', async () => {
      const component = render(
        <Provider store={store}>
          <Header />
        </Provider>
      );

      await fireEvent.change(component.getByTestId('input'), {target: {value: chance.string()}})

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('when an album is selected', () => {
    it('should update the selected album', async () => {
      const preloadedStore = configureStore({
        reducer: reducers,
        preloadedState: {
          albums: [{
            id: chance.integer(),
            userId: chance.integer(),
            title: chance.word()
          }]
        }
      });

      jest.spyOn(preloadedStore, 'dispatch').mockImplementation(() => {});

      const component = render(
        <Provider store={preloadedStore}>
          <Header />
        </Provider>
      );

      await userEvent.selectOptions(component.getByTestId('select'), preloadedStore.getState().albums[0].id.toString());

      expect(preloadedStore.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
