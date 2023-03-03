import { bindActionCreators } from 'redux';

import { actions as appActions } from 'widgets/App';
import { actions as userActions } from 'widgets/User';
import { actions as deedsActions } from 'widgets/Deeds';
import { useTypedDispatch } from './redux';

const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = {
    ...deedsActions,
    ...userActions,
    ...appActions,
  };

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};

export default useActions;
