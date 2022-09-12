import { withRouter } from 'storybook-addon-react-router-v6';

import { Authorization } from '../../../../pages/Authorization';

export default {
  title: 'UI/Authorization',
  component: Authorization,
  decorators: [withRouter]
};

export const AuthorizationPage = () => <Authorization />;
