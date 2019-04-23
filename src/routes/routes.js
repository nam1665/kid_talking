import account from 'src/modules/account/routes';
import home from 'src/modules/home/routes';
import login from 'src/modules/login/routes';
import homework from 'src/modules/homework/routes';

export default [...home, ...account, ...login, ...homework];
