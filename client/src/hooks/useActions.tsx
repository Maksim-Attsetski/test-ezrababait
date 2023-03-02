import { bindActionCreators } from 'redux';

import { actions as appActions } from 'widgets/App';
import { actions as userActions } from 'widgets/User';
import { useTypedDispatch } from './redux';

const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = {
    ...userActions,
    ...appActions,
  };

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};

export default useActions;
